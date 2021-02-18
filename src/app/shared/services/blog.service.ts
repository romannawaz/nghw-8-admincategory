import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private dbPath: string;

  constructor(
    private http: HttpClient
  ) {
    this.dbPath = 'http://localhost:3000/blogs';
  }

  getJSONBlog(): Observable<Array<IBlog>> {
    return this.http.get<Array<IBlog>>(this.dbPath);
  }

  postJSONBlog(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.dbPath, blog);
  }

  putJSONBlog(blog: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.dbPath}/${blog.id}`, blog);
  }

  deleteJSONBlog(id: number): Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.dbPath}/${id}`);
  }

}
