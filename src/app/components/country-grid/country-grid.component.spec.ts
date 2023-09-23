import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGridComponent } from './country-grid.component';

describe('CountryGridComponent', () => {
  let component: CountryGridComponent;
  let fixture: ComponentFixture<CountryGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryGridComponent]
    });
    fixture = TestBed.createComponent(CountryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
