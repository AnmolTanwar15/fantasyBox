import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestByCatComponent } from './contest-by-cat.component';

describe('ContestByCatComponent', () => {
  let component: ContestByCatComponent;
  let fixture: ComponentFixture<ContestByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestByCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
