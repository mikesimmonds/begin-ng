import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNavBarComponent } from './example-nav-bar.component';

describe('ExampleNavBarComponent', () => {
  let component: ExampleNavBarComponent;
  let fixture: ComponentFixture<ExampleNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
