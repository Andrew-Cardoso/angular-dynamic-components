import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
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
  animations: [
    trigger('animate', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'close',
        style({
          transform: 'translateX(20rem)',
        })
      ),
      transition('close <=> open', animate(150)),
    ]),
  ],
})
export class ModalComponent implements AfterViewInit {
  animationState = 'close';

  @ViewChild('template', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  onClose$ = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => (this.animationState = 'open'));
  }
}
