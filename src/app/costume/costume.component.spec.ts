import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumeComponent } from './costume.component';

describe('CostumeComponent', () => {
  let component: CostumeComponent;
  let fixture: ComponentFixture<CostumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
