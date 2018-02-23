import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestArticlesComponent } from './newest-articles.component';

describe('NewestArticlesComponent', () => {
  let component: NewestArticlesComponent;
  let fixture: ComponentFixture<NewestArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
