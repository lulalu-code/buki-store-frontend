import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.dto';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit{


  registerProduct: Product;
  title: FormControl;
  description: FormControl;
  author_name: FormControl;
  category: FormControl;
  height: FormControl;
  width: FormControl;
  length: FormControl;
  is_customable:FormControl;
  imageURL:FormControl;
  price:FormControl;

  productForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder
  ){

    this.registerProduct = new Product('','', '', '', '', 0, 0, 0, false, '', 0);
    this.isValidForm = null;

    this.title = new FormControl(this.registerProduct.title, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.description = new FormControl(this.registerProduct.description, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.author_name = new FormControl(this.registerProduct.author_name, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.category = new FormControl(this.registerProduct.category, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.height = new FormControl(this.registerProduct.height, [
      Validators.required,
    ]);

    this.width = new FormControl(this.registerProduct.width, [
      Validators.required,
    ]);

    this.length = new FormControl(this.registerProduct.length, [
      Validators.required,
    ]);

    this.is_customable = new FormControl(this.registerProduct.is_customable, [
    ]);

    this.imageURL = new FormControl(this.registerProduct.imageURL, [
      Validators.required,
    ]);

    this.price = new FormControl(this.registerProduct.price, [
      Validators.required,
    ]);

    

    this.productForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      author_name: this.author_name,
      category: this.category,
      height: this.height,
      width: this.width,
      length: this.length,
      is_customable: this.is_customable,
      imageURL:this.imageURL,
      price:this.price
      
    });
  }

  ngOnInit(): void {}


  async createProduct(): Promise<void> {}

}
