import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedLeaugesComponent } from './joined-leauges.component';

describe('JoinedLeaugesComponent', () => {
  let component: JoinedLeaugesComponent;
  let fixture: ComponentFixture<JoinedLeaugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedLeaugesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedLeaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
