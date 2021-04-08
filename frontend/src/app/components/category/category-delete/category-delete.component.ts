import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackBarService } from '../../message/custom-snack-bar/custom-snack-bar.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private customSnackBarService: CustomSnackBarService
  ) { }


  ngOnInit(): void {
    this.category = {
      name: '',
    }

    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.readById(Number(id)).subscribe(category => {
      this.category = category;
    })
  }

  deleteCategory(): void {
    this.categoryService.delete(Number(this.category.id)).subscribe(() => {
      this.customSnackBarService.successMessage('Category deleted');
      this.router.navigate(["/category"]);
    })
  }

  cancel(): void {
    this.router.navigate(['category'])
  }

}
