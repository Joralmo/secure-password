import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  form: FormGroup;
  passwordControl: FormControl;
  emailControl: FormControl;
  loading: boolean = false;
  showReportResult: boolean = false;

  constructor(private formBuilder: FormBuilder, private passwordService: PasswordService) {
    this.form = this.formBuilder.group({
      emailInput: ['', [Validators.required, Validators.email]],
      passwordInput: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)]]
    });

    this.passwordControl = this.form.get('passwordInput') as FormControl;
    this.emailControl = this.form.get('emailInput') as FormControl;
  }

  sendReport(event: Event): void {
    event.preventDefault();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.showReportResult = true;
    }, 3000);
  }

  reportResult(): string {
    return this.passwordService.reportResult(this.form.value);
  }
}
