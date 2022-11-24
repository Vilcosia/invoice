import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private subscriptions : Subscription[] = [];

  registerForm = new FormGroup({
    password: new FormControl(),
    email: new FormControl(),
    firstname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    lastname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    confirmPassword: new FormControl(),
    
  });

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends afteseconds */
      this.spinner.hide();
    }, 1000);
  }

  onRegister(form : FormGroup)
  {
    if(form.valid)
    {
      if(form.value.confirmPassword == form.value.password)
      {
        this.subscriptions.push(
          this.authService.register(form.value).subscribe((response:any)=>{
            this.router.navigateByUrl('/login');
            this.toastr.success("Welcome to Maphoskho "+form.value.name+"!");
          },(error:HttpErrorResponse)=>{
            this.toastr.error(JSON.stringify(error.error.message));
            console.log(error)
          })
        )
      }else{
        this.toastr.warning("Passwords do not match");
      }
     }

    }

  
}
