import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinDialogComponent } from './join-dialog.component';

describe('JoinDialogComponent', () => {
  let component: JoinDialogComponent;
  let fixture: ComponentFixture<JoinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
