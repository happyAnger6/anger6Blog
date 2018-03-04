import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSourcesComponent } from './blog-sources.component';

describe('BlogSourcesComponent', () => {
  let component: BlogSourcesComponent;
  let fixture: ComponentFixture<BlogSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
