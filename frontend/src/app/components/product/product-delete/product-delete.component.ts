import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackBarService } from '../../message/custom-snack-bar.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private customSnackBarService: CustomSnackBarService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(Number(id)).subscribe(product => {
      this.product = product;
    })
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

  deleteProduct(): void {
    this.productService.delete(Number(this.product.id)).subscribe(() => {
      this.customSnackBarService.warningMessage('Product deleted');
      this.router.navigate(["/products"]);
    })
  }
}
