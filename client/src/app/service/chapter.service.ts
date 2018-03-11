import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CHAPTERS_URI, API_URI } from '../shared/httpApi';

@Injectable()
export class ChapterService {

  constructor(private http: HttpClient) { }

  addChapter(newChapter) {
    return this.http.post(API_CHAPTERS_URI + 'create', newChapter);
  }
}
