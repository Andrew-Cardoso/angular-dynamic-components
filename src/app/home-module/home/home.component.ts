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

  async onClick() {
    const result = await this.modalService.modal<boolean>(AlertComponent);
    console.log(result);
  }
}
