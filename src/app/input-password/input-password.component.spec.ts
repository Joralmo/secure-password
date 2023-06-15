import { Spectator, createComponentFactory, typeInElement } from "@ngneat/spectator";
import { InputPasswordComponent } from "./input-password.component";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { spyOn } from "jest-mock";

describe('InputPasswordComponent', () => {
  let spectator: Spectator<InputPasswordComponent>;
  let passwordControl: FormControl;
  let inputElement: HTMLInputElement;
  const createComponent = createComponentFactory({
    component: InputPasswordComponent,
    declarations: [ InputComponent, ButtonComponent ],
    imports: [ ReactiveFormsModule ]
  });

  beforeEach(() => {
    passwordControl = new FormControl('');
    spectator = createComponent({ 
      props: {
        control: passwordControl
      }
    });
    inputElement = spectator.query('#passwordInput input')!;
  });

  it('Debería crear el componente', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('inputs', () => {
    it('Debería renderizar el componente con el id correcto', () => {
      expect(spectator.query('input')).toHaveAttribute('id', 'passwordInput');
    });

    it('Debería renderizar el componente con el label correcto', () => {
      spectator.setInput('label', 'Contraseña');
      expect(spectator.query('label')).toHaveText('Contraseña');
    });

    it('Debería renderizar el componente con el type correcto', () => {
      expect(spectator.query('input')).toHaveAttribute('type', 'text');
    });

    it('Debería renderizar el componente con el placeholder correcto', () => {
      spectator.setInput('placeholder', 'Ingrese su contraseña');
      expect(spectator.query('input')).toHaveAttribute('placeholder', 'Ingrese su contraseña');
    });

    it('Debería renderizar el componente con el control correcto', () => {
      expect(spectator.component.control).toBe(passwordControl);
    });
  });

  it('Debería llamar al método checkPasswordStrength al inicializar el componente', () => {
    spyOn(spectator.component, 'checkPasswordStrength');
    spectator.component.ngAfterContentInit();
    expect(spectator.component.checkPasswordStrength).toHaveBeenCalled();
  });

  it('Debería llamar al método checkPasswordStrength y actualiza la variable passwordStrength al cambiar el valor del control', () => {
    spyOn(spectator.component, 'checkPasswordStrength');

    typeInElement('123456', inputElement);

    spectator.detectChanges();

    expect(spectator.component.checkPasswordStrength).toHaveBeenCalled();
    expect(spectator.component.passwordStrength).toBe('weak');
  });

  it('Debería generar una contraseña segura y asignarla al control y al input al hacer click en el botón "Sugerir contraseña"', () => {
    const buttonElement: HTMLButtonElement = spectator.query('button')!;

    expect(inputElement.value.length).toBe(0);
    expect(spectator.component.passwordStrength).toBe('weak');
    buttonElement.click();
    spectator.detectChanges();
    expect(inputElement.value.length).toBe(8);
    expect(spectator.component.passwordStrength).toBe('very-strong');
  });

  describe('passwordStrengthBar css class', () => {
    let passwordStrengthBar: HTMLElement;
    beforeEach(() => {
      passwordStrengthBar = spectator.query('#passwordStrengthBar')!;
    });

    it('Debería renderizar el componente con la clase "weak" si la contraseña es débil', () => {
      typeInElement('123456', inputElement);
      spectator.detectChanges();
      expect(passwordStrengthBar).toHaveClass('weak');
    });
    
    it('Debería renderizar el componente con la clase "medium" si la contraseña es de fuerza media', () => {
      typeInElement('123456789', inputElement);
      spectator.detectChanges();
      expect(passwordStrengthBar).toHaveClass('medium');
    });

    it('Debería renderizar el componente con la clase "strong" si la contraseña es fuerte', () => {
      typeInElement('Abcdef123', inputElement);
      spectator.detectChanges();
      expect(passwordStrengthBar).toHaveClass('strong');
    });

    it('Debería renderizar el componente con la clase "very-strong" si la contraseña es muy fuerte', () => {
      typeInElement('Abcdef123!@#', inputElement);
      spectator.detectChanges();
      expect(passwordStrengthBar).toHaveClass('very-strong');
    });
  });
});
