import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  panelOpenState: boolean = false;

  constructor(
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Contact',
      icon: 'contacts',
      routeUrl: '/contact'
    };
  }

  ngOnInit(): void {
  }

}
