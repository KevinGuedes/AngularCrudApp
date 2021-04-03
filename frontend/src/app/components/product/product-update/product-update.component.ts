import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { CustomSnackBarService } from '../../message/custom-snack-bar.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  categories: Category[];
  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute, //pegar o id da url
    private customSnackBarService: CustomSnackBarService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.product = {
      name: '',
      price: null,
      description: null,
      amount: null,
      category: '',
      categoryId: null,
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.read().subscribe(categories => {
      this.categories = categories
      this.productService.readById(Number(id)).subscribe(product => {
        this.product = product;
        console.log(product)
      })
    })
  }

  updateProduct(): void {
    const isValidProduct = this.productService.validateProductData(this.product)

    if (isValidProduct) {
      console.log(this.product)
      this.productService.update(this.product).subscribe(() => {
        this.customSnackBarService.successMessage('Product updated');
        this.router.navigate(['/products']);
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
