import { Injectable } from '@angular/core';
import { Category } from '../models/category';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CATEGORIES_URI, API_URI } from "../shared/httpApi";

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }
  
  getAllCategories(fn) {
    this.http.get<Category[]>(API_CATEGORIES_URI + 'json',
      )
      .subscribe(data => {
           fn(data);
      });
   }
}
