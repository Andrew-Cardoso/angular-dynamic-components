import {
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Modal, ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private container!: ViewContainerRef;

  constructor(private factory: ComponentFactoryResolver) {}

  set modalContainer(container: ViewContainerRef) {
    this.container = container;
  }

  modal<T>(modal: any) {
    this.container.clear();

    const modalContainer = this.factory.resolveComponentFactory(ModalComponent);
    const modalContainerRef = this.container.createComponent(modalContainer);
    modalContainerRef.instance.container.clear();

    const modalComponent = this.factory.resolveComponentFactory(modal as any);

    const modalComponentRef =
      modalContainerRef.instance.container.createComponent(modalComponent);

    const modalInstance = modalComponentRef.instance as Modal<any>;

    const onCloseAsync = new Promise((r) => {
      modalInstance.onClose = (result?: T) => {
        modalContainerRef.instance.animationState = 'close';
        modalInstance.subscriptions.forEach((subs: Subscription) =>
          subs.unsubscribe()
        );
        setTimeout(() => {
          modalContainerRef.instance.container.clear();
          this.container.clear();
          r(result);
        }, 150);
      };
    });

    return onCloseAsync as Promise<T>;
  }
}
