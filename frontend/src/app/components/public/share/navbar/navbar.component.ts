import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './../../../../../assets/css/bootstrap.css']
})
export class NavbarComponent implements OnInit {

imageUrl = "assets/oo.png";

  constructor() { }

  ngOnInit(): void {
  }

}
