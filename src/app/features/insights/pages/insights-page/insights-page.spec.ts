import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsPage } from './insights-page';

describe('InsightsPage', () => {
  let component: InsightsPage;
  let fixture: ComponentFixture<InsightsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
