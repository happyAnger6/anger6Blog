import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCloudComponent } from './category-cloud.component';

describe('CategoryCloudComponent', () => {
  let component: CategoryCloudComponent;
  let fixture: ComponentFixture<CategoryCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
