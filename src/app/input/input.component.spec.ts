import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let spectator: Spectator<InputComponent>;
  const createComponent = createComponentFactory({
    component: InputComponent,
    imports: [ ReactiveFormsModule ]
  });

  it('Debería crear el componente', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('Debería renderizar el componente con el texto correcto', () => {
    spectator = createComponent({
      props: {
        label: 'Nombre'
      }
    });
    expect(spectator.query('label')).toHaveText('Nombre');
  });

  it('Debería renderizar el con el type correcto', () => {
    spectator = createComponent({
      props: {
        type: 'password'
      }
    });
    expect(spectator.query('input')).toHaveAttribute('type', 'password');
  });

  it('Debería renderizar el componente type text por defecto', () => {
    spectator = createComponent();
    expect(spectator.query('input')).toHaveAttribute('type', 'text');
  });

  it('Debería renderizar el componente con el placeholder correcto', () => {
    spectator = createComponent({
      props: {
        placeholder: 'Ingrese su nombre'
      }
    });
    expect(spectator.query('input')).toHaveAttribute('placeholder', 'Ingrese su nombre');
  });

  it('Debería renderizar el componente con el id correcto', () => {
    spectator = createComponent({
      props: {
        id: 'nombre'
      }
    });
    expect(spectator.query('input')).toHaveAttribute('id', 'nombre');
  });

  it('Debería renderizar el componente con el label correcto', () => {
    spectator = createComponent({
      props: {
        label: 'Nombre'
      }
    });
    expect(spectator.query('label')).toHaveText('Nombre');
  });

  it('Debería renderizar el componente con el control correcto', () => {
    const control = new FormControl();
    spectator = createComponent({
      props: {
        control
      }
    });
    expect(spectator.component.control).toEqual(control);
    // expect(spectator.component.control).toBeTruthy();
    // expect(spectator.component.control).toBeInstanceOf(FormControl);
  });
});