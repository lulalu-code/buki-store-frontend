import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit{

  selectedFile: File | undefined;

  registerProduct: Product;
  title: FormControl;
  description: FormControl;
  author_name: FormControl;
  category: FormControl;
  cm_height: FormControl;
  cm_width: FormControl;
  cm_length: FormControl;
  is_customable:FormControl;
  imageURL:FormControl;
  price:FormControl;

  productForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
  ){

    this.registerProduct = new Product('','', '', '', '', undefined, undefined, undefined, false, '', undefined);
    this.isValidForm = null;

    this.title = new FormControl(this.registerProduct.title, [
      Validators.required,
      Validators.minLength(3),
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

    this.cm_height = new FormControl(this.registerProduct.cm_height, [
      Validators.required,
    ]);

    this.cm_width = new FormControl(this.registerProduct.cm_width, [
      Validators.required,
    ]);

    this.cm_length = new FormControl(this.registerProduct.cm_length, [
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
      cm_height: this.cm_height,
      cm_width: this.cm_width,
      cm_length: this.cm_length,
      is_customable: this.is_customable,
      imageURL:this.imageURL,
      price:this.price
      
    });
  }

  ngOnInit(): void {
    this.title.setValue(this.registerProduct.title);
    this.description.setValue(this.registerProduct.description);
    this.author_name.setValue(this.registerProduct.author_name);
    this.category.setValue(this.registerProduct.category);
    this.cm_height.setValue(this.registerProduct.cm_height);
    this.cm_width.setValue(this.registerProduct.cm_width);
    this.cm_length.setValue(this.registerProduct.cm_length);
    this.is_customable.setValue(this.registerProduct.is_customable);
    this.imageURL.setValue(this.registerProduct.imageURL);
    this.price.setValue(this.registerProduct.price);
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    //this.files.push(filePushed)
  }
  async createProduct(): Promise<void> {
    let errorResponse: any;
    
    try {
      this.productService.createProduct(this.productForm.value).subscribe();
      console.log(this.productForm.value);
    } catch (error: any) {
      errorResponse = error.error;
      console.log(errorResponse);
    }
  }
 
  

}


