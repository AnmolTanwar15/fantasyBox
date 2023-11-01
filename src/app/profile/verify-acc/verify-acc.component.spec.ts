import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccComponent } from './verify-acc.component';

describe('VerifyAccComponent', () => {
  let component: VerifyAccComponent;
  let fixture: ComponentFixture<VerifyAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
