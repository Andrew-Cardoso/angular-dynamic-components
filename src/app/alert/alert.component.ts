import { Component } from '@angular/core';
import { Modal } from '../modal/modal.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
})
export class AlertComponent extends Modal<boolean> {
  constructor() {
    super();
  }
}
