import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public isShown:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShow(){
    this.isShown = !this.isShown;
  }

}
