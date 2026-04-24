describe('Открытие панели с уведомлениями', () => {
    const LOGIN_URL = 'https://dev.profteam.su/login';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('Позитивный сценарий: доступ к списку уведомлений', () => {
        cy.get('[autocomplete="username"]').type('Rokets');
        cy.get('[autocomplete="current-password"]').type('Skyfall2024!');
        cy.get('form').contains('button', ' Войти ').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('.header-container__desktop').click();
    });
});