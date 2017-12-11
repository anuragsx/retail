import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailScreenComponent } from './retail-screen.component';

describe('RetailScreenComponent', () => {
  let component: RetailScreenComponent;
  let fixture: ComponentFixture<RetailScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
