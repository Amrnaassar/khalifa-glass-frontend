import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProjectsComponent } from './our-projects.component';

describe('OurProjectsComponent', () => {
  let component: OurProjectsComponent;
  let fixture: ComponentFixture<OurProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
