import {Component, Input, OnInit} from '@angular/core';
import {Device} from "../models/Device";
import {Router} from "@angular/router";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit {
  @Input() device: Device;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onCardClick() {
    this.router.navigate(['device-detail', this.device.id]);
  }

}
