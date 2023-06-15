import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonComponent } from './button.component';
import { jest } from '@jest/globals';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory(ButtonComponent);

  it('Debería crear el componente', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('Debería renderizar el componente, con el texto "Click me!"', () => {
    spectator = createComponent({
      props: {
        label: 'Click me!'
      }
    });
    expect(spectator.query('button')).toHaveText('Click me!');
  });

  it('Debería deshabilitar el botón cuando se le pasa la propiedad disabled en true', () => {
    spectator = createComponent({
      props: {
        disabled: true
      }
    });
    expect(spectator.query('button')).toBeDisabled();
  });

  it('Debería estar habilitado por defecto sino se proporciona la propiedad disabled', () => {
    spectator = createComponent();
    expect(spectator.query('button')).not.toBeDisabled();
  });

  it('Debería ejecutar la función recibida por parámetro al hacer click en el botón', () => {
    const mockFn = jest.fn();
    spectator = createComponent({
      props: {
        onClick: mockFn
      }
    });

    spectator.click('button');

    expect(mockFn).toHaveBeenCalled();
  });

});