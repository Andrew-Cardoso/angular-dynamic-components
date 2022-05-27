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

  modal<T>(modal: T) {
    this.container.clear();

    const modalContainer = this.factory.resolveComponentFactory(ModalComponent);
    const modalContainerRef = this.container.createComponent(modalContainer);
    modalContainerRef.instance.container.clear();

    const modalComponent = this.factory.resolveComponentFactory(modal as any);

    const modalComponentRef =
      modalContainerRef.instance.container.createComponent(modalComponent);

    const modalInstance = modalComponentRef.instance as Modal<any>;

    const onClose$ = new EventEmitter<any>();
    modalInstance.onClose = (result?: T) => onClose$.emit(result);

    return onClose$.pipe(
      tap(() => {
        modalInstance.subscriptions.forEach((subs: Subscription) =>
          subs.unsubscribe()
        );
        modalContainerRef.instance.container.clear();
        this.container.clear();
      })
    );
  }
}
