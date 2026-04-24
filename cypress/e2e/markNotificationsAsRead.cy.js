describe('Отметка уведомлений как прочитанных', () => {
    const LOGIN_URL = 'https://dev.profteam.su/login';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('Позитивный сценарий: массовое прочтение всех уведомлений', () => {
        cy.get('[autocomplete="username"]').type('VladIsMargoo');
        cy.get('[autocomplete="current-password"]').type('Nokeer3390100!');
        cy.get('form').contains('button', ' Войти ').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('.header-container__desktop').click();
        cy.get('.header-container__desktop .notification-bell__similar')
            .contains('.link--size-small', 'Прочитать все')
            .should('be.visible')
            .click();
    });
});