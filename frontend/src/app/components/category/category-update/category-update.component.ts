import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackBarService } from '../../message/custom-snack-bar/custom-snack-bar.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private customSnackBarService: CustomSnackBarService
  ) { }

  ngOnInit(): void {
    this.category = {
      category: '',
    }

    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.readById(Number(id)).subscribe(category => {
      this.category = category;
    })
  }

  updateCategory(): void {
    const isValidCategory = this.categoryService.validateCategoryData(this.category)

    if (isValidCategory) {
      this.categoryService.update(this.category).subscribe(() => {
        this.customSnackBarService.successMessage('Category updated');
        this.router.navigate(['/category']);
      })
    }
  }

  cancel(): void {
    this.router.navigate(['category'])
  }
}
