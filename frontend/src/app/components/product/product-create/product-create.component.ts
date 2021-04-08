import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service'
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { CustomSnackBarService } from 'src/app/components/message/custom-snack-bar/custom-snack-bar.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

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
    category: '',
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private customSnackBarService: CustomSnackBarService,
    private categoryService: CategoryService
  ) { }

  productFormControl = new FormControl({
    name: '',
    amount: 0
  }, [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.categoryService.read().subscribe(categories => {
      this.categories = categories
    })
  }

  createProduct(): void {
    this.productFormControl.markAsTouched();

    const isValidProduct = this.productService.validateProductData(this.product);

    if (isValidProduct) {
      this.productService.create(this.product).subscribe(() => {
        this.customSnackBarService.successMessage('Product created')
        this.router.navigate(['/products'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
