import { Component, OnInit } from '@angular/core';
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

  showSearchTable: boolean = false;
  products: Product[]
  minPrice: number = 0;
  maxPrice: number = 0;
  displayedColumns = ['id', 'name', 'price', 'amount', 'description', 'actions']

  constructor(
    private router: Router,
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
    this.productService.readByPriceRange(this.minPrice, this.maxPrice).subscribe(products => {
      this.products = products;
      if (products.length > 0) {
        this.customSnackBarService.successMessage('Search completed');
        this.showSearchTable = true;
      }
      else {
        this.customSnackBarService.warningMessage('No results found');
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/home'])
  }
}
