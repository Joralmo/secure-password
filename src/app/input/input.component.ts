import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input('id') id: string;
  @Input('label') label: string;
  @Input('type') type: string;
  @Input('placeholder') placeholder: string;
  @Input('control') control: FormControl;
  @Output('fnEmit') fnEmit = new EventEmitter();

  constructor() { 
    this.id = '';
    this.label = '';
    this.type = 'text';
    this.placeholder = '';
    this.control = new FormControl();
  }

  emitValue(): void {
    this.fnEmit.emit();
  }
}
