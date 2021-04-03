import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.css']
})
export class CustomSnackBarComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) { }

  ngOnInit() { }

  closeSnackbar() {
    this.data.snackBar.dismiss();
  }

}
