import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from './product.model';
import { Observable, EMPTY } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //service singleton -> instância única na aplicação
})
export class ProductService {

  baseUlr = "http://localhost:3001/products";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'X', { //pode ser qualquer nome além do x apra fechar a notificação
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  notFoundMessage(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-not-found']
    })
  }

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

  readByPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
    const url = `${this.baseUlr}/search`;

    if (minPrice > maxPrice) {
      [maxPrice, minPrice] = [minPrice, maxPrice]
    }

    const range = {
      maxPrice: maxPrice,
      minPrice: minPrice
    }

    return this.http.post<Product[]>(url, range).pipe(
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
    this.showMessage("An error has occurred", true)
    return EMPTY
  }
}
