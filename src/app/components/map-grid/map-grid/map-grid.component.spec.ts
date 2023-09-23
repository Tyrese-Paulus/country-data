import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGridComponent } from './map-grid.component';

describe('MapGridComponent', () => {
  let component: MapGridComponent;
  let fixture: ComponentFixture<MapGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapGridComponent]
    });
    fixture = TestBed.createComponent(MapGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
