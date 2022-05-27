import {
  Component,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

export class Modal<T> {
  onClose(result?: T) {}
  subscriptions: Subscription[] = [];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  @ViewChild('template', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  onClose$ = new EventEmitter<any>();

  constructor() {}
}
