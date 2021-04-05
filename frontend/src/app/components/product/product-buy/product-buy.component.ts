import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CustomSnackBarService } from '../../message/custom-snack-bar.service';

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class ProductBuyComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  product: Product;
  min: number;
  max: number;
  step: number = 1;
  thumbLabel: boolean = true;
  amount: number = 1;
  total: number;
  hideInput: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private customSnackBarService: CustomSnackBarService
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
    this.productService.readById(Number(id)).subscribe(product => {
      this.product = product;
      this.total = product.price;
      this.max = product.amount;
    })

    this.firstFormGroup = this._formBuilder.group({
      customer: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      amount: ['', Validators.required],
    })
  }

  onChange() {
    this.total = this.amount * this.product.price;
  }

  buy(): void {
    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
      this.customSnackBarService.warningMessage('Enter all the necessary data to finish the purchased')
    }
    else {
      this.product.amount = this.product.amount - this.amount;
      this.productService.update(this.product).subscribe(() => {
        this.customSnackBarService.successMessage('Product purchases')
      })
    }
  }
}
