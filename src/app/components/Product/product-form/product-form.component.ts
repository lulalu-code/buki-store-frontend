import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.dto';
import { EventTypesDTO } from 'src/app/models/event-types.dto';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';


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
  created_at: Date;

  productForm: FormGroup;
  product: Product;
  isValidForm: boolean | null;
  private productId: string | null

  private productUpdateSubscription: Subscription;
  private productCreationSubscription: Subscription;
  private getProductSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ){
    this.img = '';
    this.responseOK = false;
    this.isUpdateMode = false;

    this.created_at = new Date;
    this.product = new Product('','', '', '', '', undefined, undefined, undefined, false, '', undefined, this.created_at);
    this.isValidForm = null;
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

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

    this.productUpdateSubscription = new Subscription;
    this.productCreationSubscription = new Subscription;
    this.getProductSubscription = new Subscription;

  }

  ngOnInit(): void {

    if(this.productId) {
      this.isUpdateMode = true;
      this.getProductSubscription = this.productService.getProductById(this.productId).subscribe({
        next: (product: Product) => {
          this.title.setValue(product.title);
          this.description.setValue(product.description);
          this.category.setValue(product.category);
          this.cm_height.setValue(product.cm_height);
          this.cm_width.setValue(product.cm_width);
          this.cm_length.setValue(product.cm_length);
          this.is_customable.setValue(product.is_customable);
          this.imageURL.setValue(product.imageURL);
          this.price.setValue(product.price);
          this.created_at = product.created_at;
        },
        error: error => {
          console.log('getProductById error: ' + JSON.stringify(error.error));
          this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.productUpdateSubscription.unsubscribe();
    this.productCreationSubscription.unsubscribe();
    this.getProductSubscription.unsubscribe();
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader(); // 
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.get('imageURL')!.setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1] // https://stackoverflow.com/questions/52032591/error-property-split-does-not-exist-on-type-string-arraybuffer-property
        })
      };
    }
  }

  createProduct(): void { // https://stackoverflow.com/questions/71989511/how-to-make-program-wait-until-observable-is-executed-in-angular

    let author_name = this.storageService.getUser().author_name;
    this.product.author_name = author_name;
    
    this.productCreationSubscription = this.productService.createProduct(this.product).subscribe({
      next: (product: Product) => {
        this.responseOK = true;
        this.toastService.openSnackBar('¡Product ' + product.title + ' creado con éxito!', 'OK', EventTypesDTO.Success)
        this.router.navigateByUrl('profile/' + this.product.author_name);
      },
      error: error => {
        console.log('productService error:' + JSON.stringify(error.error));
        this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error)
      }
    });

  }

  editProduct(): void {
    let responseOK = false;
    if (this.productId) {
      let author_name = this.storageService.getUser().author_name;
      if(author_name) {
        this.product.author_name = author_name;
      }
      else {
        return;
      }
      console.log('Update product')
      this.productUpdateSubscription = this.productService.updateProduct(this.productId, this.product).subscribe({
        next: () => {
          responseOK = true;
          this.router.navigateByUrl('profile/' + this.product.author_name);
          this.toastService.openSnackBar('¡Producto actualizado con éxito!', 'OK', EventTypesDTO.Success)
        },
        error: error => {
          console.log(error.error);
          this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
        }
      })
    }
  }

  saveProduct(): void {
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

  goBack(): void {
    this.location.back();
  }

}


