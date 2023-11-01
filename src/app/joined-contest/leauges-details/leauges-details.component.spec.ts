import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaugesDetailsComponent } from './leauges-details.component';

describe('LeaugesDetailsComponent', () => {
  let component: LeaugesDetailsComponent;
  let fixture: ComponentFixture<LeaugesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaugesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaugesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
