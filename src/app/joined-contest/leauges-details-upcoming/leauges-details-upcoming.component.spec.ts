import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaugesDetailsUpcomingComponent } from './leauges-details-upcoming.component';

describe('LeaugesDetailsUpcomingComponent', () => {
  let component: LeaugesDetailsUpcomingComponent;
  let fixture: ComponentFixture<LeaugesDetailsUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaugesDetailsUpcomingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaugesDetailsUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
