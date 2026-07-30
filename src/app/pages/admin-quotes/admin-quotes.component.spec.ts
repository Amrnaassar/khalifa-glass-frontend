import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuotesComponent } from './admin-quotes.component';

describe('AdminQuotesComponent', () => {
  let component: AdminQuotesComponent;
  let fixture: ComponentFixture<AdminQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
