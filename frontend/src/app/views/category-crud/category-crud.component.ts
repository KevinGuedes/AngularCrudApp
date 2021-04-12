import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css']
})
export class CategoryCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Categories',
      icon: 'category',
      routeUrl: '/category'
    }
  }

  ngOnInit(): void {
  }

  navigateToCategoryCreate(): void {
    this.router.navigate(['category/create'])
  }
}
