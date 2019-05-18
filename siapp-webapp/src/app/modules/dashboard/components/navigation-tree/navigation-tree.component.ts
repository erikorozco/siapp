import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.css']
})
export class NavigationTreeComponent implements OnInit {

   @Input() data = null; 

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
