import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

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
  total: number;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
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


  showResults(): void {
    console.log(this.firstFormGroup.value)
    console.log(this.secondFormGroup.value.amount);
  }
}
