import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  // invoices
  id :any
  Client:any;
  Service:any;
  Amount:any;
  Status : any;
  invoice:any[]=[];

  
  

  constructor(private userService : UserService, private auth :AuthService, private router:Router) { }
    invoicePostForm= new FormGroup({
    client: new FormControl(),
    service: new FormControl(),
    amount: new FormControl()
  


  });

  updatePostForm= new FormGroup({
    
    client: new FormControl(),
    service: new FormControl(),
    amount: new FormControl(),
 
   
  });

  onSubmit(form: FormGroup) {

    //console.log(localStorage.getItem('user_id'));
    

    let invoiceData = {
      client:form.value.client,
      service:form.value.service,
      amount:form.value.amount,
      status:"pending"
    }
    console.log(invoiceData)

    this.userService.addInvoice(invoiceData).subscribe((data:any) =>{
      console.log(data)
      this.refresh(); 
     
     // this.toastr.success(data.message);

    },(err: HttpErrorResponse)=>{

     // this.toastr.error(err.error.message);


    })
    this.invoicePostForm.reset();
  }

  ngOnInit(): void {
      // this.invoices = setInterval(() => {
        this.refresh(); 
      // }, 2000);
     
  }




refresh()
{
  // if(localStorage.getItem('isLoggedIn') =='yes')
    // {
      
      this.userService.getInvoice().subscribe((data:any)=>{
        this.invoice = data
        console.log(data)
        localStorage.setItem('Invoices',String(this.invoice.length));

      },(err: HttpErrorResponse)=>{
        //this.toastr.error(err.error.message);
      })
    // }
  
}

onUpdate(form:FormGroup)
{
  this.userService.updateInvoice().subscribe((data:any)=>{
   // this.toastr.success(data.message);
  },(err: HttpErrorResponse)=>{
    //console.log(err)
    //this.toastr.error(err.error.message);
  })
}

setDetails(client:any,service:any,amount:any){
      
      this.Client = client;
      this.Service = service;
      this.Amount= amount;
    }



data ={
  status: '',
  invoice_id: ''
}
  changeStatus(status:any, invoiceNo:any){
    this.data.status = status;
    this.data.invoice_id = invoiceNo;

    this.userService.updateStatus(this.data).subscribe(async(data:any)=>{
      //this.toastr.success(data.message);
      

    },(err : HttpErrorResponse)=>{
      //this.toastr.error(err.error.message);
    })
    
    
  }



}
