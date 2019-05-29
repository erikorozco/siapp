import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input() statusProperties: any;
  isActive: boolean;

  constructor() { }

  ngOnInit() {
    this.isActive = this.statusProperties[0];
  }

  changeStatus(status) {
    this.isActive = !status;
    console.log(this.isActive);
    
  }

}
