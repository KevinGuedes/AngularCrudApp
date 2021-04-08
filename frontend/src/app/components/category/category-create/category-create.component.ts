import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSnackBarService } from '../../message/custom-snack-bar/custom-snack-bar.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: Category;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private customSnackBarService: CustomSnackBarService
  ) { }

  ngOnInit(): void {
    this.category = {
      name: '',
    }
  }

  createCategory(): void {
    const isValidCategory = this.categoryService.validateCategoryData(this.category);

    if (isValidCategory) {
      this.categoryService.readByName(`${this.category.name[0].toUpperCase()}` + `${this.category.name.slice(1)}`).subscribe(existingCategory => {
        console.log(existingCategory)
        if (existingCategory) {
          this.customSnackBarService.warningMessage('This category already exist')
        }
        else {
          this.categoryService.create(this.category).subscribe(() => {
            this.customSnackBarService.successMessage('Category created')
            this.router.navigate(['/category'])
          })
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['category'])
  }
}
