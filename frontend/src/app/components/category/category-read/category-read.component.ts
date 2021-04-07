import { Category } from './../category.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.css']
})
export class CategoryReadComponent implements OnInit {

  dataSource: MatTableDataSource<Category>;
  displayedColumns = ['id', 'category', 'actions']
  showProgressBar: boolean;
  isSearchCompleted: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.showProgressBar = true;

    this.categoryService.read().subscribe(categories => {
      this.dataSource = new MatTableDataSource(categories)
      console.log(categories)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showProgressBar = false;
      this.isSearchCompleted = true;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
