import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDataComponent } from './school-data.component';

describe('SchoolDataComponent', () => {
  let component: SchoolDataComponent;
  let fixture: ComponentFixture<SchoolDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
