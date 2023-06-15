import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent {
  
  passwordStrength: string = "";
  @Input('id') id: string;
  @Input('label') label: string;
  @Input('type') type: string;
  @Input('placeholder') placeholder: string;
  @Input('control') control: FormControl;

  constructor(private passwordService: PasswordService) { 
    this.id = '';
    this.label = '';
    this.type = 'text';
    this.placeholder = '';
    this.control = new FormControl();
  }

  ngAfterContentInit(): void {
    this.checkPasswordStrength();
  }

  suggestPassword(event: Event): void {
    event.preventDefault();
    const passwordSuggested = this.passwordService.suggestStrongPassword();
    this.control.patchValue(passwordSuggested);
    this.checkPasswordStrength();
  }

  checkPasswordStrength(): void {
    this.passwordStrength = this.passwordService.checkPasswordStrength(this.control.value);
  }
}
