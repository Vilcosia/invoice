import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';
//import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  client: any [] = [];
  invoice : any [] = [];

  constructor(private userService : UserService,private router:Router) { }



  ngOnInit(): void {

    // this.router.navigate(['path/to'])
    // .then(() => {
    //   window.location.reload();
    // });

    this.userService.getInvoice().subscribe((data:any) => {
    
      if(data.length != 0){
        this.invoice = data;
      }

    })

    this.userService.getClients().subscribe((data:any) => {
 
      if(data.length != 0){
        this.client = data;
      }

    })

   

  }



}
