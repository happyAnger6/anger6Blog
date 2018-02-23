import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathNavComponent } from './path-nav.component';

describe('PathNavComponent', () => {
  let component: PathNavComponent;
  let fixture: ComponentFixture<PathNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
