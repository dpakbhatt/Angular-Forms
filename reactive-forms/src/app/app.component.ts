import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm: FormGroup;
  errorMsg= '';
  submitted= false;

  get userName(){
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }

  //USING FORMBUILDER
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedvalue => {
        const email = this.registrationForm.get('email');
        if(checkedvalue){
          email.setValidators(Validators.required)
        }else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  /*
  registrationForm = new FormGroup({
    userName: new FormControl('Deepak'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });

  */

  loadApidata(){
    /* FOR LOADING ALL DATA FROM API
    this.registrationForm.setValue({
      userName: "Deepak",
      password: "qwerty",
      confirmPassword: "qwerty",
      address: {
        city: "Rewari",
        state: "Haryana",
        postalCode: "123401",
      }
    });
    */

    // FOR LOADING PARTICULAR DATA
    this.registrationForm.patchValue({
      userName: "Deepak",
      password: "qwerty1",
      confirmPassword: "qwerty1"
    });
  }

  onSubmit(){
    //console.log(this.registrationForm.value);
    this.submitted = true;
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log("Success!", response),
        error => this.errorMsg = error.statusText
      );
  }
}
