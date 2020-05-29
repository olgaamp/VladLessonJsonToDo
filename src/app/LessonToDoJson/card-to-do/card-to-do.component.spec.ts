import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardToDoComponent } from './card-to-do.component';

describe('CardToDoComponent', () => {
  let component: CardToDoComponent;
  let fixture: ComponentFixture<CardToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
