import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardrestaurantComponent } from './cardrestaurant.component';

describe('CardrestaurantComponent', () => {
  let component: CardrestaurantComponent;
  let fixture: ComponentFixture<CardrestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardrestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
