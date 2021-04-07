import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CustomSnackBarService } from 'src/app/components/message/custom-snack-bar/custom-snack-bar.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../message/custom-dialog/custom-dialog.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {
      showError: true,
      displayDefaultIndicatorType: false
    }
  }]
})
export class ProductBuyComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  product: Product;
  max: number;
  thumbLabel: boolean = true;
  total: number = 0;
  hideInput: boolean = true;
  purchaseEnabled: boolean = false;
  formCompleted: boolean = false;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private customSnackBarService: CustomSnackBarService,
    public dialog: MatDialog
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

  onChange(): void {
    this.total = this.thirdFormGroup.value.amount * this.product.price;
    if (this.thirdFormGroup.value.amount > 0)
      this.purchaseEnabled = true;
    else {
      this.purchaseEnabled = false;
    }
  }

  finishPurchase(): void {
    if ((!this.firstFormGroup.valid || !this.secondFormGroup.valid) && this.purchaseEnabled) {
      this.customSnackBarService.warningMessage('Enter all the necessary data to finish the purchased')
    }
    else {
      this.product.amount = this.product.amount - this.thirdFormGroup.value.amount;
      this.productService.update(this.product).subscribe(() => {
        this.dialog.open(CustomDialogComponent, {
          width: '30%',
          data: {
            customer: this.firstFormGroup.value.customer,
          },
        });
      })
    }
  }
}
