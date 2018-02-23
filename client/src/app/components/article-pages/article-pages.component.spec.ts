import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePagesComponent } from './article-pages.component';

describe('ArticlePagesComponent', () => {
  let component: ArticlePagesComponent;
  let fixture: ComponentFixture<ArticlePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
