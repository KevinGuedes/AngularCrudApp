import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomSnackBarService } from '../message/custom-snack-bar/custom-snack-bar.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUlr: string = "http://localhost:3001/category";

  constructor(
    private http: HttpClient,
    private customSnackBarService: CustomSnackBarService
  ) { }

  read(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUlr).pipe(
      map(c => c),
      catchError(error => this.errorHandler(error))
    );
  }

  readById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUlr}/${id}`).pipe(
      map(c => c),
      catchError(error => this.errorHandler(error))
    );
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUlr}/${category.id}`, category).pipe(
      map(c => c),
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(error: any): Observable<any> {
    this.customSnackBarService.errorMessage("An error has occurred")
    return EMPTY
  }

  validateCategoryData(category: Category): boolean {
    if (!category.category) {
      this.customSnackBarService.warningMessage(`Enter the category name`)
      return false;
    }
    return true;
  }
}
