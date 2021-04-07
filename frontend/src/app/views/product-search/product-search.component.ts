import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/components/category/category.model';
import { CategoryService } from 'src/app/components/category/category.service';
import { CustomSnackBarService } from 'src/app/components/message/custom-snack-bar/custom-snack-bar.service';
import { Product } from 'src/app/components/product/product.model';
import { ProductService } from 'src/app/components/product/product.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  categories: Category[];
  isSearchCompleted: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;
  categoryId?: number;
  productName?: string;
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['id', 'name', 'price', 'amount', 'category', 'actions']
  showProgressBar: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private productService: ProductService,
    private headerService: HeaderService,
    private customSnackBarService: CustomSnackBarService,
    private categoryService: CategoryService
  ) {
    headerService.headerData = {
      title: 'Search',
      icon: 'search',
      routeUrl: '/products/search'
    }
  }

  ngOnInit(): void {
    this.categoryService.read().subscribe(categories => {
      this.categories = categories
    })
  }

  searchProduct(): void {
    this.showProgressBar = true;

    this.productService.readByPriceRangeAndCategory(this.minPrice, this.maxPrice, this.categoryId, this.productName).subscribe(products => {
      this.dataSource = new MatTableDataSource(products)
      this.showProgressBar = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (products.length > 0) {
        this.customSnackBarService.successMessage('Search completed');
        this.isSearchCompleted = true;
      }
      else {
        this.customSnackBarService.warningMessage('No results found');
        this.isSearchCompleted = false;
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
