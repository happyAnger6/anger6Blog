import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersSectionsMenuComponent } from './chapters-sections-menu.component';

describe('ChaptersSectionsMenuComponent', () => {
  let component: ChaptersSectionsMenuComponent;
  let fixture: ComponentFixture<ChaptersSectionsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersSectionsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersSectionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
