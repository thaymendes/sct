import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortifolioPage } from './portifolio.page';

describe('PortifolioPage', () => {
  let component: PortifolioPage;
  let fixture: ComponentFixture<PortifolioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortifolioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortifolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
