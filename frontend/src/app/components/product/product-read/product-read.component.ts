import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../product.model';
import { ProductService } from './../product.service'
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  @Input('productsData') productsData$: Observable<Product[]>;
  @Input() pageSizeOptions: number[];
  @Input() pageSize: number;

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['id', 'name', 'price', 'amount', 'category', 'actions']
  showProgressBar: boolean;
  isSearchCompleted: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.showProgressBar = true;

    this.productsData$.subscribe(products => {
      if (products.length > 0) {
        this.dataSource = new MatTableDataSource(products)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isSearchCompleted = true;
      }

      this.showProgressBar = false;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
