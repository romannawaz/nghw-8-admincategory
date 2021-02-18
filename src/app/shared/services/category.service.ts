import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath: string;

  constructor(
    private http: HttpClient
  ) {
    this.dbPath = 'http://localhost:3000/category'
  }

  getJSONCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.dbPath);
  }

  postJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.dbPath, category);
  }

  putJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.dbPath}/${category.id}`, category);
  }

  deleteJSONCategory(id: number | string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.dbPath}/${id}`);
  }
}
