describe('burger constructor tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getItems');
    cy.visit('http://localhost:4000');
    cy.wait('@getItems');

    cy.get('li:first[data-cy="ingredient-bun"]').as('firstItem');
  });

  describe('Проверка модального окна ингредиента', function () {
    it('Открытие модального окна и проверка первого ингредиента', function () {
      cy.get('@firstItem').click();
      cy.get('[data-cy="ingredient-modal"]').should(
        'have.text',
        'Краторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53'
      );
    });

    it('Закрытие модального окна ингридиента по крестику', function () {
      cy.get('@firstItem').click();
      cy.get('[data-cy="modal-close"]').click();
      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('Закрытие модального окна ингредиента по overlay', function () {
      cy.get('@firstItem').click();
      // Кликаем в область вне модального контента
      cy.get('body').click('topLeft');

      cy.url().should('eq', 'http://localhost:4000/');
    });
  });

  describe('Проверка добавления ингредиента в конструктор', function () {
    it('Добавление ингридиента в конструктор', function () {
      cy.get('@firstItem').find('button').click();
      cy.get('[data-cy="bun-text"]')
        .find('.constructor-element__text')
        .should('have.text', 'Краторная булка N-200i (верх)');
    });
  });

  describe('Проверка оформления заказа', function () {
    beforeEach(() => {
      cy.intercept('POST', '**/auth/login', { fixture: 'login' }).as(
        'postLogin'
      );
      cy.intercept('GET', '**/auth/user', { fixture: 'user' }).as('getUser');
      cy.intercept('POST', '**/orders', { fixture: 'order' }).as('order');
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken');
      cy.visit('http://localhost:4000');
      cy.wait('@getItems');
    });

    it('Проверка вызова модального окна с подтверждением заказа и очисткой конструктора', function () {
      cy.get('[data-cy="ingredient-bun"]').first().find('button').click();
      cy.get('[data-cy="ingredient-main"]').first().find('button').click();
      cy.get('[data-cy="ingredient-sauce"]').first().find('button').click();
      cy.get('[data-cy="order-submit"]').click();
      cy.get('[data-cy="modal"').should('exist');
      cy.get('[data-cy="new-order-number"]').should('have.text', '88780');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="no-bun-text"').should('exist');
      cy.get('[data-cy="no-main-text"').should('exist');
    });
  });

  afterEach(() => {
    // Очищаем данные
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });
});