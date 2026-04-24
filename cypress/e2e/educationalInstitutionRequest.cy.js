describe('Оформление кабинета компании-работодателя', () => {
    const LOGIN_URL = 'https://dev.profteam.su/login';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('Позитивный кейс: создание заявки на роль работодателя', () => {
        cy.get('[autocomplete="username"]').type('Rokets');
        cy.get('[autocomplete="current-password"]').type('Skyfall2024!');
        cy.get('form').contains('button', ' Войти ').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('.page-nav__role-block button', { timeout: 3000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        cy.get('div').contains('p', 'Я являюсь представителем коммерческой организации').should('not.be.disabled').click();
        cy.get('div').contains('p', 'Создание нового личного кабинета работодателя').should('not.be.disabled').click();
        cy.get('[placeholder="Название вашей организации"]').type('IT Solutions');
        cy.get('[placeholder="Адрес вашей организации"]').type('г. Санкт-Петербург, Невский пр., д. 10');
        cy.get('[placeholder="Описание вашей организации"]').type('Разработка программного обеспечения');
        cy.get('.create-company-form__description-block button', { timeout: 2000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();
    });

    it('Негативный кейс: отправка незаполненной формы', () => {
        cy.get('[autocomplete="username"]').type('Rokets');
        cy.get('[autocomplete="current-password"]').type('Skyfall2024!');
        cy.get('form').contains('button', ' Войти ').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('.page-nav__role-block button', { timeout: 3000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        cy.get('div').contains('p', 'Я являюсь представителем коммерческой организации').should('not.be.disabled').click();
        cy.get('div').contains('p', 'Создание нового личного кабинета работодателя').should('not.be.disabled').click();
        cy.get('.create-company-form__description-block button').should('be.visible');
    });
});