import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { customer: string }
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/products'])
    });
  }

}
