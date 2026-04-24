describe('Вход в учётную запись', () => {
    const LOGIN_URL = 'https://dev.profteam.su/login';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('Позитивный сценарий: корректные логин и пароль', () => {
        cy.get('[autocomplete="username"]').type('VladIsMargoo');
        cy.get('[autocomplete="current-password"]').type('Nokeer3390100!');

        cy.get('form').contains('button', ' Войти ').should('not.be.disabled').click();
    });

    it('Негативный сценарий: незаполненные поля', () => {
        cy.get('form').contains('button', ' Войти ').should('be.disabled');

        cy.get('[autocomplete="username"]').focus().blur();
        cy.get('[autocomplete="current-password"]').first().focus().blur();
    });

    it('Негативный сценарий: неверные учётные данные', () => {
        cy.get('[autocomplete="username"]').type('fakeUser');
        cy.get('[autocomplete="current-password"]').type('wrongPass');
        cy.get('form').contains('button', ' Войти ').click();
        cy.contains('Неверный логин или пароль, попробуйте заново.').should('be.visible');
    });
});