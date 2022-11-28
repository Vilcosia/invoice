
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Validation from './userValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  private subscriptions : Subscription[] = [];
  
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required,Validators.minLength(3)],
        lastname: ['',Validators.required,Validators.minLength(3)],
          
        
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
            
          ]
        ],
        confirmPassword: ['', Validators.required],
       
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onRegister(form : FormGroup): void {
    this.submitted = true;
    console.log(form.value)

    if (this.registerForm.invalid) {
      return;
      
    }
    
    else{
      this.authService.register(this.registerForm.value).subscribe((response:any)=>{
        console.log(response);
        this.router.navigateByUrl('/login');
      })

    }
    console.log(JSON.stringify(this.registerForm.value, null, 2));

    
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

 

  
}