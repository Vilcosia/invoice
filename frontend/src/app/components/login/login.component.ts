import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscriptions : Subscription[] = [];
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });


  constructor(private authService: AuthService,private router:Router,private jwt :JwtService,private spinner: NgxSpinnerService) { }
 

  ngOnInit(): void {

    this.spinner.show();
   
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
   }

  onLogin(form : FormGroup)
  {
    
    this.spinner.show();
        setTimeout(() => {
      /** spinner ends after 5 seconds */
        this.spinner.hide();
        }, 2000);

    this.subscriptions.push(
      this.authService.login(form.value).subscribe((data: any)=>{
        this.authService.saveToken(data.token);
        

        const {email,firstname,lastname,user_id} = this.jwt.getData(data.token);
        localStorage.setItem('email',email);
        localStorage.setItem('firstname',firstname);
        localStorage.setItem('lastname',lastname);
        localStorage.setItem('user_id',user_id);
       

        

    },(error:HttpErrorResponse)=>{
      //this.toastr.error(error.error.message);
    })
    )    
  }

}