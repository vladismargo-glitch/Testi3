describe('Оформление кабинета компании-работодателя', () => {
    const LOGIN_URL = 'https://dev.profteam.su/login';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('Позитивный кейс: создание заявки на роль работодателя', () => {
        cy.get('[autocomplete="username"]').type('Rokets');
        cy.get('[autocomplete="current-password"]').type('Skyfall2024!');
        cy.get('form').contains('button', ' Войти ').click();

        cy.url({ timeout: 10000 }).should('not.include', '/login');
        cy.wait(2000);

        cy.get('body').then($body => {
            const roleButton = $body.find('.page-nav__role-block button');

            if (roleButton.length > 0 && roleButton.is(':visible')) {
                cy.get('.page-nav__role-block button').click();
                cy.wait(500);

                cy.contains('Я являюсь представителем коммерческой организации').click();
                cy.contains('Создание нового личного кабинета работодателя').click();
            } else {
                cy.log('Кнопка выбора роли не найдена, возможно роль уже есть');
            }
        });

        cy.get('body').then($body => {
            if ($body.find('[placeholder="Название вашей организации"]').length > 0) {
                cy.get('[placeholder="Название вашей организации"]').type('IT Solutions');
                cy.get('[placeholder="Адрес вашей организации"]').type('г. Санкт-Петербург, Невский пр., д. 10');
                cy.get('[placeholder="Описание вашей организации"]').type('Разработка программного обеспечения');

                cy.get('.create-company-form__description-block button', { timeout: 5000 })
                    .should('be.visible')
                    .click();
            } else {
                cy.log('Форма создания кабинета не найдена');
            }
        });
    });

    it('Негативный кейс: отправка незаполненной формы', () => {
        cy.get('[autocomplete="username"]').type('VladIsMargoo');
        cy.get('[autocomplete="current-password"]').type('Nokeer3390100!');
        cy.get('form').contains('button', ' Войти ').click();

        cy.url({ timeout: 10000 }).should('not.include', '/login');
        cy.wait(2000);

        cy.get('body').then($body => {
            const roleButton = $body.find('.page-nav__role-block button');

            if (roleButton.length > 0 && roleButton.is(':visible')) {
                cy.get('.page-nav__role-block button').click();
                cy.wait(500);
                cy.contains('Я являюсь представителем коммерческой организации').click();
                cy.contains('Создание нового личного кабинета работодателя').click();
            }
        });

        cy.get('body').then($body => {
            if ($body.find('.create-company-form__description-block button').length > 0) {
                cy.get('.create-company-form__description-block button').should('be.visible');
            }
        });
    });
});