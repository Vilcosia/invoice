import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  clients: any [] = [];
  invoices : any [] = [];

  constructor(  private userService : UserService) { }



  ngOnInit(): void {

    this.userService.getInvoices().subscribe((data:any) => {
    
      if(data.length != 0){
        this.invoices = data;
      }

    })

    this.userService.getClients().subscribe((data:any) => {
 
      if(data.length != 0){
        this.clients = data;
      }

    })

   

  }



}
