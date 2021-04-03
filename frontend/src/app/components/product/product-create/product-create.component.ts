import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service'
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { CustomSnackBarService } from '../../message/custom-snack-bar.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  categories: Category[];

  product: Product = {
    name: '',
    price: null,
    amount: null,
    description: '',
    categoryId: null,
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private customSnackBarService: CustomSnackBarService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.read().subscribe(categories => {
      this.categories = categories
    })
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.customSnackBarService.successMessage('Product created')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
