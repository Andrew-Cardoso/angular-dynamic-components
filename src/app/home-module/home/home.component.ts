import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AlertComponent } from 'src/app/alert/alert.component';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private modalService: ModalService) {}

  onClick() {
    this.modalService
      .modal(AlertComponent)
      .pipe(take(1))
      .subscribe((x) => console.log(x));
  }
}
