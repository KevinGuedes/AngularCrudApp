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

  errorHandler(error: any): Observable<any> {
    this.customSnackBarService.errorMessage("An error has occurred")
    return EMPTY
  }
}
