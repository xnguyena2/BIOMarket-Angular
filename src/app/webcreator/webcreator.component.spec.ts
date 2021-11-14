import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcreatorComponent } from './webcreator.component';

describe('WebcreatorComponent', () => {
  let component: WebcreatorComponent;
  let fixture: ComponentFixture<WebcreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
