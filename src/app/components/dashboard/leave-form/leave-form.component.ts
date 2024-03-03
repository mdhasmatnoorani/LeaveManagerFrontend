import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent {
  leaveFrom: string | undefined;

  clearPlaceholder(event: any) {
    event.target.value = '';
  }

  setPlaceholder(event: any) {
    if (!event.target.value) {
      event.target.value = 'YYYY-MM-DDTHH:mm';
    }
  }

}
