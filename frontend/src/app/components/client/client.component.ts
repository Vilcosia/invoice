import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  // invoices
  id :any
  FullName:any;
  PhoneNr:any;
  Email:any;
  Service : any;
  Clients:any[]=[];

  
  

  constructor(private userService : UserService, private auth :AuthService, private router:Router) { }
    clientPostForm= new FormGroup({
    fullname: new FormControl(),
    phone_no: new FormControl(),
    email: new FormControl(),
    service:new FormControl()
  


  });

  updateClientForm= new FormGroup({
    
    fullname: new FormControl(),
    Phone_no: new FormControl(),
    email: new FormControl(),
    service:new FormControl()
 
   
  });

  onSubmit(form: FormGroup) {

    //console.log(localStorage.getItem('user_id'));
    

    let clientData = {
      fullname:form.value.fullName,
      phone_no:form.value.phoneNr,
      email:form.value.email,
      service:form.value.service
    }
    console.log(clientData)

    this.userService.addClient(this.clientPostForm.value).subscribe((data:any) =>{
      console.log(data)
      this.refresh();
     
    },(err: HttpErrorResponse)=>{

     // this.toastr.error(err.error.message);


    })
    this.clientPostForm.reset();
  }

  ngOnInit(): void {
      // this.invoices = setInterval(() => {
        this.refresh(); 
      // }, 2000);
     
  }




refresh()
{
  
      
      this.userService.getClients().subscribe((data:any)=>{
        this.Clients = data
        console.log(data)
        localStorage.setItem('Clients',String(this.Clients.length));

      },(err: HttpErrorResponse)=>{
        console.log(err)
        //this.toastr.error(err.error.message);
      })
    
  
}

// onUpdate(form:FormGroup)
// {
//   this.userService.updateClient().subscribe((data:any)=>{
//    // this.toastr.success(data.message);
//   },(err: HttpErrorResponse)=>{
//     //console.log(err)
//     //this.toastr.error(err.error.message);
//   })
// }

setDetails(fullname:any,phone_no:any,service:any,email:any){
      
      this.FullName = fullname;
      this.Service = service;
      this.Email= email;
      this.PhoneNr=phone_no;
    }



}
