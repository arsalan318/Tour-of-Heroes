import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumeDetailsComponent } from './costume-details.component';

describe('CostumeDetailsComponent', () => {
  let component: CostumeDetailsComponent;
  let fixture: ComponentFixture<CostumeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostumeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
