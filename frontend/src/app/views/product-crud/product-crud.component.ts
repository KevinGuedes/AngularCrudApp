import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../components/product/product.model';
import { ProductService } from 'src/app/components/product/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  productsData$: Observable<Product[]>;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private productService: ProductService
  ) {
    headerService.headerData = {
      title: 'Products',
      icon: 'storefront',
      routeUrl: '/products'
    }
  };

  ngOnInit(): void {
    this.productsData$ = this.productService.read();
  }

  navigateToProductCreate() {
    this.router.navigate(['/products/create'])
  }
}
