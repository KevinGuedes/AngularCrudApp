import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from './product.model';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root' //service singleton -> instância única na aplicação
})
export class ProductService {
  baseUlr = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'X', { //pode ser qualquer nome além do x apra fechar a notificação
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUlr, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUlr)
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUlr}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUlr}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  delete(id: string): Observable<Product> {
    const url = `${this.baseUlr}/${id}`
    return this.http.delete<Product>(url)
  }
}
