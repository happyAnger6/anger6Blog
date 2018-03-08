import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddChaptersComponent } from './category-add-chapters.component';

describe('CategoryAddChaptersComponent', () => {
  let component: CategoryAddChaptersComponent;
  let fixture: ComponentFixture<CategoryAddChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddChaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
