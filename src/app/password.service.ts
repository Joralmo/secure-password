import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  private uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private numbers = '0123456789';
  private specialCharacters = '!@#$%^&*()';

  constructor() { }

  checkPasswordStrength(password: string): string {
    let strength = 0;

    if (password.length >= 8) {
      strength += 33.3;
    }
    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
      strength += 33.3;
    }
    if (/[!@#$%^&*()]/.test(password)) {
      strength += 33.3;
    }

    if (strength < 33.3) {
      return "weak";
    } else if (strength < 66.6) {
      return "medium";
    } else if (strength < 99) {
      return "strong";
    } else {
      return "very-strong";
    }
  }

  getRandomCharacter = (characters: string) => {
    if (characters === '') return '';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  suggestStrongPassword(): string {
    let password = '';
    password += this.getRandomCharacter(this.lowercaseLetters);
    password += this.getRandomCharacter(this.uppercaseLetters);
    password += this.getRandomCharacter(this.numbers);
    password += this.getRandomCharacter(this.specialCharacters);
    const remainingLength = 8 - password.length;
    for (let i = 0; i < remainingLength; i++) {
      const allCharacters = this.lowercaseLetters + this.uppercaseLetters + this.numbers + this.specialCharacters;
      password += this.getRandomCharacter(allCharacters);
    }
    return password;
  }

  reportResult(data: Object): string {
    return JSON.stringify(data, undefined, 2);
  }
}
