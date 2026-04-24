describe('Тестирование регистрации пользователя', () => {
    const REG_URL = 'https://dev.profteam.su/registration';

    beforeEach(() => {
        cy.visit(REG_URL);
        cy.wait(2000);
    });

    it('Регистрация нового пользователя', () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let randomPart = '';
        for (let i = 0; i < 8; i++) {
            randomPart += chars[Math.floor(Math.random() * chars.length)];
        }
        const newLogin = `User${randomPart}`;
        const newEmail = `${newLogin}@testbox.ru`;
        const newPass = 'Skyfall1';

        cy.get('[autocomplete="email"]').type(newEmail);
        cy.get('[autocomplete="username"]').type(newLogin);
        cy.get('[autocomplete="new-password"]').first().type(newPass);
        cy.get('[autocomplete="new-password"]').last().type(newPass);

        cy.contains('button', 'Далее').click();
        cy.wait(1000);

        cy.get('[autocomplete="family-name"]').type('Соколов');
        cy.get('[autocomplete="given-name"]').type('Дмитрий');
        cy.get('[autocomplete="additional-name"]').type('Андреевич');

        cy.contains('button', 'Создать аккаунт').click();

        cy.url().should('not.include', '/registration');
    });
    it('Пустые обязательные поля', () => {
        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.get('[autocomplete="email"]').focus().blur();
        cy.get('[autocomplete="username"]').focus().blur();
        cy.get('[autocomplete="new-password"]').first().focus().blur();
    });

    it('Неверный формат Email', () => {
        cy.get('[autocomplete="email"]').type('invalid-email').blur();
        cy.get('[autocomplete="username"]').type('TestUser');
        cy.get('[autocomplete="new-password"]').first().type('Skyfall1');
        cy.get('[autocomplete="new-password"]').last().type('Skyfall1');
        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('некорректная почта').should('be.visible');
    });

    it('Пароль не соответствует требованиям', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('TestUser');
        cy.get('[autocomplete="new-password"]').first().type('weak');
        cy.get('[autocomplete="new-password"]').last().type('weak');
        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('мин 6 символов').should('be.visible');
    });

    it('Пароли не совпадают', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('TestUser');
        cy.get('[autocomplete="new-password"]').first().type('Skyfall1');
        cy.get('[autocomplete="new-password"]').last().type('DifferentPass').blur();
        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('Пароли не совпадают').should('be.visible');
    });

    it('Логин содержит кириллицу', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('ТестовыйЛогин').blur();
        cy.get('[autocomplete="new-password"]').first().type('Skyfall1');
        cy.get('[autocomplete="new-password"]').last().type('Skyfall1');
        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('символы латиницы').should('be.visible');
    });

    it('ФИО латиницей', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('TestUser');
        cy.get('[autocomplete="new-password"]').first().type('Skyfall1');
        cy.get('[autocomplete="new-password"]').last().type('Skyfall1');
        cy.get('form').contains('button', 'Далее').click();
        cy.get('[autocomplete="family-name"]').type('Sokolov').blur();
        cy.get('form').contains('button', 'Создать аккаунт').should('be.disabled');
        cy.contains('кириллица').should('be.visible');
    });
});