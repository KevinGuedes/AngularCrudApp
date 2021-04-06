import { CustomSnackBarService } from 'src/app/components/message/custom-snack-bar/custom-snack-bar.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, EMPTY } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //service singleton -> instância única na aplicação
})
export class ProductService {

  private baseUlr: string = "http://localhost:3001/products";

  constructor(
    private http: HttpClient,
    private customSnackBarService: CustomSnackBarService
  ) { }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUlr, product).pipe(
      map(p => p),
      catchError(error => this.errorHandler(error))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUlr).pipe(
      map(p => p),
      catchError(error => this.errorHandler(error))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUlr}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(p => p),
      catchError(error => this.errorHandler(error))
    );
  }

  readByPriceRangeAndCategory(minPrice: number, maxPrice: number, categoryId: number, productName: string): Observable<Product[]> {
    const url = `${this.baseUlr}/search`;

    if (minPrice > maxPrice) {
      [maxPrice, minPrice] = [minPrice, maxPrice]
    }

    const searchParameter = {
      maxPrice: maxPrice,
      minPrice: minPrice,
      categoryId: categoryId,
      productName: productName
    }

    return this.http.post<Product[]>(url, searchParameter).pipe(
      map(p => p),
      catchError(error => this.errorHandler(error))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUlr}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(p => p),
      catchError(error => this.errorHandler(error))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUlr}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(p => p),
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(error: any): Observable<any> {
    this.customSnackBarService.errorMessage("An error has occurred")
    return EMPTY
  }

  validateProductData(product: Product): boolean {
    for (let [key, value] of Object.entries(product)) {
      if (!value) {
        this.customSnackBarService.warningMessage(`Enter the product ${key == 'categoryId' ? 'category' : key}`)
        return false;
      }
    }
    return true;
  }
}
