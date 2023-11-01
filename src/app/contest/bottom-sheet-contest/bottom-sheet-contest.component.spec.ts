import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetContestComponent } from './bottom-sheet-contest.component';

describe('BottomSheetContestComponent', () => {
  let component: BottomSheetContestComponent;
  let fixture: ComponentFixture<BottomSheetContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetContestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
