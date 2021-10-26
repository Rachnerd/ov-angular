import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grocery } from './grocery';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private url = 'assets/api/groceries.json'

  constructor(
    private http: HttpClient) {
  }

  getAllGroceries(): Observable<Grocery[]> {
    return this.http.get<{ groceries: Grocery[] }>(this.url).pipe(map(({ groceries }) => groceries));
  }
}
