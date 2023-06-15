describe('Home', () => {
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordStrengthBar: Cypress.Chainable<JQuery<HTMLElement>>;
  beforeEach(() => {
    cy.visit('/');
    passwordInput = cy.get('#passwordInput');
    passwordStrengthBar = cy.get('#passwordInput #passwordStrengthBar');
  });

  const validData = {
    securePassword: 'Abcdef123!@#',
    validMail: 'valid@mail.com'
  };

  function fillForm() {
    cy.get('#passwordInput').type(validData.securePassword);
    cy.get('#emailInput').type(validData.validMail);
  }

  function passwordStrengthCheck(password:string, strength: string, color: string) {
    passwordInput.clear();
    passwordInput.type(password);
    passwordStrengthBar.should('have.class', strength);
    passwordStrengthBar.should('have.css', 'background-color', color);
  }

  it('Debería mostrar el título correcto de la página', () => {
    cy.get('h1').should('contain', 'Verificación de Contraseñas Seguras');
  });

  it('Debería estar deshabilitado el botón "Enviar reporte" si el formulario no es válido', () => {
    cy.get('#passwordInput').type('123456789');
    cy.get('#emailInput').type('invalid-email');
    cy.get('#sendReport button').should('be.disabled');
  });

  it('Debería estar habilitado el botón "Enviar reporte" si el formulario es válido', () => {
    fillForm();
    cy.get('#sendReport button').should('be.enabled');
  });

  it('Debería mostrar un mensaje de carga cuando se pulsa el botón "Enviar reporte"', () => {
    fillForm();
    cy.get('#sendReport button').click();
    cy.get('.loading-container').should('be.visible');
    cy.get('.loading').should('contain', 'Enviando reporte...');
  });

  it('Debería mostrar el resultado del reporte cuando se pulsa el botón "Enviar reporte"', () => {
    fillForm();
    cy.get('#sendReport button').click();
    cy.wait(3000);
    cy.get('.report-result').should('be.visible');
    cy.get('.report-result span').should('contain', 'Resultado del reporte:');
    cy.get('.report-result pre').should('contain', validData.securePassword);
    cy.get('.report-result pre').should('contain', validData.validMail);
  });

  describe('passwordStrength css class', () => {
    it('Debería mostrar la clase "weak" cuando la contraseña es débil', () => {
      passwordStrengthCheck('123456', 'weak', 'red');
    });

    it('Debería mostrar la clase "medium" cuando la contraseña es media', () => {
      passwordStrengthCheck('123567890', 'medium', 'orange');
    });

    it('Debería mostrar la clase "strong" cuando la contraseña es fuerte', () => {
      passwordStrengthCheck('Abcdef123', 'strong', 'yellow');
    });

    it('Debería mostrar la clase "very-strong" cuando la contraseña es muy fuerte', () => {
      passwordStrengthCheck('Abcdef123!@#', 'very-strong', 'green');
    });
  });
});
