import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductaddPage } from './productadd.page';

describe('ProductaddPage', () => {
  let component: ProductaddPage;
  let fixture: ComponentFixture<ProductaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
