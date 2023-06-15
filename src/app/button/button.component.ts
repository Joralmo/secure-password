import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input('disabled') disabled: boolean;
  @Input('onClick') onClick: ($event: Event) => void;
  @Input('label') label: string;

  constructor() {
    this.disabled = false;
    this.onClick = () => {};
    this.label = '';
  }

}
