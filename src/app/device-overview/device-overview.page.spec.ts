import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceOverviewPage } from './device-overview.page';

describe('DeviceOverviewPage', () => {
  let component: DeviceOverviewPage;
  let fixture: ComponentFixture<DeviceOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
