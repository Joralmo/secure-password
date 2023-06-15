import { SpectatorService, createServiceFactory } from "@ngneat/spectator";
import { PasswordService } from "./password.service";

describe('PasswordService', () => {
  let spectator: SpectatorService<PasswordService>;
  const createService = createServiceFactory(PasswordService);

  beforeEach(() => spectator = createService());

  describe('checkPasswordStrength', () => {
    it('Debería devolver "weak" para una contraseña débil', () => {
      const password = '123456';
      const strength = spectator.service.checkPasswordStrength(password);
      expect(strength).toBe('weak');
    });
  
    it('Debería devolver "medium" para una contraseña de fuerza media', () => {
      const password = '123456789';
      const strength = spectator.service.checkPasswordStrength(password);
      expect(strength).toBe('medium');
    });
  
    it('Debería devolver "strong" para una contraseña fuerte', () => {
      const password = 'Abcdef123';
      const strength = spectator.service.checkPasswordStrength(password);
      expect(strength).toBe('strong');
    });
  
    it('Debería devolver "very-strong" para una contraseña muy fuerte', () => {
      const password = 'Abcdef123!@#';
      const strength = spectator.service.checkPasswordStrength(password);
      expect(strength).toBe('very-strong');
    });
  });

  describe('getRandomCharacter', () => {
    it('Debería devolver un carácter aleatorio de una cadena de caracteres', () => {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      const character = spectator.service.getRandomCharacter(characters);
      expect(characters.includes(character)).toBe(true);
    });
  
    it('Debería devolver vacío de una cadena de caracteres vacía', () => {
      const characters = '';
      const character = spectator.service.getRandomCharacter(characters);
      expect(character).toBe('');
    });
  
    it('Debería devolver un carácter aleatorio de una cadena de caracteres con un solo carácter', () => {
      const characters = 'a';
      const character = spectator.service.getRandomCharacter(characters);
      expect(character).toBe('a');
    });
  });

  describe('suggestStrongPassword', () => {
    it('Debería generar una contraseña segura de longitud 8', () => {
      const password = spectator.service.suggestStrongPassword();
      expect(password.length).toBe(8);
    });
  
    it('Debería generar una contraseña segura que contenga una letra minúscula', () => {
      const password = spectator.service.suggestStrongPassword();
      expect(password).toMatch(/[a-z]/);
    });
  
    it('Debería generar una contraseña segura que contenga una letra mayúscula', () => {
      const password = spectator.service.suggestStrongPassword();
      expect(password).toMatch(/[A-Z]/);
    });
  
    it('Debería generar una contraseña segura que contenga un número', () => {
      const password = spectator.service.suggestStrongPassword();
      expect(password).toMatch(/[0-9]/);
    });
  
    it('Debería generar una contraseña segura que contenga un carácter especial', () => {
      const password = spectator.service.suggestStrongPassword();
      expect(password).toMatch(/[!@#$%^&*()]/);
    });
  });

  describe('reportResult', () => {
    it('Debería devolver una representación en formato JSON del objeto proporcionado', () => {
      const data = {
        name: 'JoralmoPro',
        age: 30,
        city: 'Santa Marta'
      };
      const expectedResult = JSON.stringify(data, undefined, 2);
      const result = spectator.service.reportResult(data);
      expect(result).toEqual(expectedResult);
    });
  
    it('Debería devolver una representación en formato JSON de un objeto vacío', () => {
      const data = {};
      const expectedResult = JSON.stringify(data, undefined, 2);
      const result = spectator.service.reportResult(data);
      expect(result).toEqual(expectedResult);
    });
  });

});
