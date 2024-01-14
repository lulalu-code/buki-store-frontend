import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  subject: FormControl;
  message: FormControl;
  contact: any;

  constructor(private formBuilder: FormBuilder, private location: Location){
    this.contact = {
      subject: '',
      message: '',
    }
    this.subject = new FormControl(this.contact.subject, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]);
    this.message = new FormControl(this.contact.message, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(3000),
    ])
    this.contactForm = this.formBuilder.group({
      subject: this.subject,
      message: this.message
    })
  }

  ngOnInit(): void { }

  saveMessage(): void{
    // To be completed
  }

  goBack(): void {
    this.location.back();
  }

}
