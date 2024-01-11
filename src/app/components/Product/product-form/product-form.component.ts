import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  selectedFile: File | undefined;

  
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

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
    private storageService: StorageService,
    private router: Router,
  ){
    this.product = new Product('','', '', '', '', undefined, undefined, undefined, false, '', undefined);
    this.isValidForm = null;

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
    this.title.setValue(this.product.title);
    this.description.setValue(this.product.description);
    this.category.setValue(this.product.category);
    this.cm_height.setValue(this.product.cm_height);
    this.cm_width.setValue(this.product.cm_width);
    this.cm_length.setValue(this.product.cm_length);
    this.is_customable.setValue(this.product.is_customable);
    this.imageURL.setValue(this.product.imageURL);
    this.price.setValue(this.product.price);
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    //this.files.push(filePushed)
  }
  async createProduct(): Promise<void> {
    let errorResponse: any;
    console.log('Creating product')
    this.product = this.productForm.value;
    let author_name = this.storageService.getUser().author_name;
    this.product.author_name = author_name;
    
    try {
      this.productService.createProduct(this.product).subscribe();
      this.router.navigateByUrl('/');
    } catch (error: any) {
      errorResponse = error.error;
      console.log(errorResponse);
    }
  }
 
  

}


