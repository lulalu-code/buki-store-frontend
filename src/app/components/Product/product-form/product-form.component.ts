import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  selectedFile!: File;
  img: string;
  responseOK: boolean;
  private isUpdateMode: boolean;
  
  title: FormControl;
  description: FormControl;
  category: FormControl;
  cm_height: FormControl;
  cm_width: FormControl;
  cm_length: FormControl;
  is_customable:FormControl;
  imageURL:FormControl;
  price:FormControl;

  productForm: FormGroup;
  product: Product;
  isValidForm: boolean | null;
  private productId: string | null

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
    private storageService: StorageService,
    private router: Router,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
  ){
    this.img = '';
    this.responseOK = false;
    this.isUpdateMode = false;

    this.product = new Product('','', '', '', '', undefined, undefined, undefined, false, '', undefined);
    this.isValidForm = null;
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Product ID ---> ' + this.productId)

    this.title = new FormControl(this.product.title, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]);

    this.description = new FormControl(this.product.description, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.category = new FormControl(this.product.category, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.cm_height = new FormControl(this.product.cm_height, [
      Validators.required,
    ]);

    this.cm_width = new FormControl(this.product.cm_width, [
      Validators.required,
    ]);

    this.cm_length = new FormControl(this.product.cm_length, [
      Validators.required,
    ]);

    this.is_customable = new FormControl(this.product.is_customable, [
    ]);

    this.imageURL = new FormControl(this.product.imageURL, [
      Validators.required,
    ]);

    this.price = new FormControl(this.product.price, [
      Validators.required,
    ]);

    this.productForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      category: this.category,
      cm_height: this.cm_height,
      cm_width: this.cm_width,
      cm_length: this.cm_length,
      is_customable: this.is_customable,
      imageURL:this.imageURL,
      price:this.price
    });
  }

  ngOnInit(): void {

    if(this.productId) {
      this.isUpdateMode = true;
      try {
        this.productService.getProductById(this.productId).subscribe({
          next: product => {
            this.title.setValue(product.title);
            this.description.setValue(product.description);
            this.category.setValue(product.category);
            this.cm_height.setValue(product.cm_height);
            this.cm_width.setValue(product.cm_width);
            this.cm_length.setValue(product.cm_length);
            this.is_customable.setValue(product.is_customable);
            this.imageURL.setValue(product.imageURL);
            this.price.setValue(product.price);
          },
          error: err => console.log('Login error: ' + err.error.message)
        })
      } catch (error:any) {
        this.sharedService.errorLog(error.error);
      }

    }

  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    //this.files.push(filePushed)
    let reader = new FileReader(); // 
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //this.img = (<string>reader.result).split(',')[1]
        this.productForm.get('imageURL')!.setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1] // https://stackoverflow.com/questions/52032591/error-property-split-does-not-exist-on-type-string-arraybuffer-property
        })
      };
    }
  }

  async createProduct(): Promise<void> {
    let errorResponse: any;
    let responseOK: boolean = false;

    let author_name = this.storageService.getUser().author_name;
    this.product.author_name = author_name;
    
    try {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.responseOK = true;
          this.router.navigateByUrl('profile/' + this.product.author_name);
        },
        error: error => this.sharedService.errorLog(error.error)
      });
      //this.router.navigateByUrl('/');

    } catch (error: any) {
      this.sharedService.errorLog(error.error);
    }

    await this.sharedService.managementToast(
      'productFeedback',
      responseOK,
      errorResponse
    );

  }

  editProduct(): any {
    let responseOK = false;
    let errorResponse: any;
    if (this.productId) {
      let author_name = this.storageService.getUser().author_name;

      if(author_name) {
        this.product.author_name = author_name;
      }
      else {
        return;
      }
      try {
        console.log('Update product')
        this.productService.updateProduct(this.productId, this.product).subscribe({
          next: () => {
            responseOK = true;
            this.router.navigateByUrl('profile/' + this.product.author_name);
          },
          error: error => console.log(error.error)
        })
      } catch (error: any) {
        errorResponse = error.error
        this.sharedService.errorLog(errorResponse);
      }
      /*await this.sharedService.managementToast(
        'categoryFeedback',
        responseOK,
        errorResponse
      );*/

    }
    return responseOK;
  }

  saveProduct(): any {
    if(this.productForm.invalid) {
      return;
    }

    this.product = this.productForm.value;
    
    if(this.isUpdateMode) {
      this.editProduct();
    } else {
      this.createProduct();
    }
  }

}


