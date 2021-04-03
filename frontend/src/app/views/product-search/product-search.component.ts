import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomSnackBarService } from 'src/app/components/message/custom-snack-bar.service';
import { Product } from 'src/app/components/product/product.model';
import { ProductService } from 'src/app/components/product/product.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  hideSearchTable: boolean = true;
  minPrice: number = 0;
  maxPrice: number = 0;
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['id', 'name', 'price', 'amount', 'category', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private productService: ProductService,
    private headerService: HeaderService,
    private customSnackBarService: CustomSnackBarService,
  ) {
    headerService.headerData = {
      title: 'Search',
      icon: 'search',
      routeUrl: '/products/search'
    }
  }

  ngOnInit(): void {
  }

  searchProduct(): void {
    this.productService.readByPriceRange(this.minPrice, /*this.maxPrice*/ 100000000).subscribe(products => {
      this.dataSource = new MatTableDataSource(products)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (products.length > 0) {
        this.customSnackBarService.successMessage('Search completed');
        this.hideSearchTable = false;
      }
      else {
        this.customSnackBarService.warningMessage('No results found');
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
