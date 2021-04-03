import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service'
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { CustomSnackBarService } from '../../message/custom-snack-bar.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null,
    amount: null,
    description: '',
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private customSnackBarService: CustomSnackBarService
  ) { }

  ngOnInit(): void {
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
