import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProjectsSectionComponent } from './our-projects-section.component';

describe('OurProjectsSectionComponent', () => {
  let component: OurProjectsSectionComponent;
  let fixture: ComponentFixture<OurProjectsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurProjectsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurProjectsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
