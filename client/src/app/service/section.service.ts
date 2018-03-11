import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_SECTIONS_URI, API_URI } from '../shared/httpApi';

@Injectable()
export class SectionService {

  constructor(private http: HttpClient) { }

  addSection(newSection) {
    return this.http.post(API_SECTIONS_URI + 'create', newSection);
  }
}
