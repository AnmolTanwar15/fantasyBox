import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedContestComponent } from './joined-contest.component';

describe('JoinedContestComponent', () => {
  let component: JoinedContestComponent;
  let fixture: ComponentFixture<JoinedContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedContestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
