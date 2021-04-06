import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from './custom-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  duration: number = 3000;

  constructor(public snackBar: MatSnackBar) { }

  successMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: this.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['msg-success'],
      data: { message: message, icon: 'check' }
    });
  }

  errorMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: this.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['msg-error'],
      data: { message: message, icon: 'error' }
    });
  }

  warningMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: this.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['msg-warning'],
      data: { message: message, icon: 'priority_high' /*warning*/ }
    });
  }

}
