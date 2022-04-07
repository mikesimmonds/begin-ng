import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrencesControlComponent } from './occurrences-control.component';

describe('OccurrencesControlComponent', () => {
  let component: OccurrencesControlComponent;
  let fixture: ComponentFixture<OccurrencesControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurrencesControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrencesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
