import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedLeaugesUpcomingComponent } from './joined-leauges-upcoming.component';

describe('JoinedLeaugesUpcomingComponent', () => {
  let component: JoinedLeaugesUpcomingComponent;
  let fixture: ComponentFixture<JoinedLeaugesUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedLeaugesUpcomingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedLeaugesUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
