import { Spectator, createComponentFactory, typeInElement } from "@ngneat/spectator";
import { HomeComponent } from "./home.component";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { InputPasswordComponent } from "../input-password/input-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { spyOn } from "jest-mock";
import { fakeAsync, tick } from "@angular/core/testing";

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  let sendReportButton: HTMLButtonElement;
  let passwordInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    declarations: [ InputComponent, ButtonComponent, InputPasswordComponent ],
    imports: [ ReactiveFormsModule ]
  });

  beforeEach(() => {
    spectator = createComponent();
    sendReportButton = spectator.query('#sendReport button') as HTMLButtonElement;
    passwordInput = spectator.query('#passwordInput input') as HTMLInputElement;
    emailInput = spectator.query('#emailInput input') as HTMLInputElement;
  });

  function typeValidData(): void {
    typeInElement('Abcdef123!@#', passwordInput);
    typeInElement('valid@mail.com', emailInput);
    spectator.detectChanges();
  }

  function clickSendReportButton(): void {
    sendReportButton.click();
    spectator.detectChanges();
  }

  it('Debería crear el componente', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Debería deshabilitar el botón "Enviar reporte" si el formulario es inválido', () => {
    typeInElement('12345678', passwordInput);
    typeInElement('invalidEmail', emailInput);
    spectator.detectChanges();
    expect(sendReportButton.disabled).toBe(true);
  });

  it('Debería habilitar el botón "Enviar reporte" si el formulario es válido', () => {
    typeValidData();
    expect(sendReportButton.disabled).toBe(false);
  });

  it('Debería llamar al método sendReport al hacer click en el botón "Enviar reporte"', () => {
    spyOn(spectator.component, 'sendReport');
    typeValidData();
    clickSendReportButton();
    expect(spectator.component.sendReport).toHaveBeenCalled();
  });

  it('Debería mostrar el mensaje "Enviando reporte..." al hacer click en el botón "Enviar reporte"', () => {
    typeValidData();
    clickSendReportButton();
    expect(spectator.element).toHaveText('Enviando reporte...');
  });

  it('Debería mostrar el resultado del reporte al hacer click en el botón "Enviar reporte"', fakeAsync (() => {

    typeValidData();
    clickSendReportButton();

    tick(3000);

    spectator.detectChanges();

    const reportResult = spectator.query('.report-result') as HTMLDivElement;

    expect(reportResult).toBeTruthy();
    expect(reportResult).toHaveText('Abcdef123!@#');
    expect(reportResult).toHaveText('valid@mail.com');
  }));
});
