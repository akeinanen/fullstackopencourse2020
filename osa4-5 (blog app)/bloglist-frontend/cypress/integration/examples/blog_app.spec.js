describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'TestiTimo',
            name: 'Timo',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('#loginForm')
            .contains('username:')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username')
                .type('TestiTimo')
            cy.get('#password')
                .type('salasana')
            cy.get('#loginButton')
                .click()
            cy.contains('Timo logged in')
        })
        it('fails with wrong credentials', function() {
            cy.get('#username')
                .type('TestiTimo')
            cy.get('#password')
                .type('väärä')
            cy.get('#loginButton')
                .click()
            cy.contains('Wrong username or password')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username')
                .type('TestiTimo')
            cy.get('#password')
                .type('salasana')
            cy.get('#loginButton')
                .click()
        })

        it('A blog can be created', function() {
            cy.contains('Add new blog')
                .click()
            cy.get('#title')
                .type('Article about testing')
            cy.get('#author')
                .type('TestiTimo')
            cy.get('#url')
                .type('tt.fi/article-about-testing')
            cy.get('#addBlog')
                .click()
            cy.contains('Article about testing by TestiTimo added!')
        })

        describe('When blog exists', function() {
            beforeEach(function() {
                cy.contains('Add new blog')
                    .click()
                cy.get('#title')
                    .type('Article about testing')
                cy.get('#author')
                    .type('TestiTimo')
                cy.get('#url')
                    .type('tt.fi/article-about-testing')
                cy.get('#addBlog')
                    .click()
                cy.contains('Article about testing by TestiTimo added!')
            })

            it('blog can be liked', function() {
                cy.contains('show more')
                    .click()
                cy.contains('like')
                    .click()
                cy.get('#likes')
                    .contains('1')
            })

            it('blog can be deleted', function() {
                cy.contains('show more')
                    .click()
                cy.contains('remove')
                    .click()
                cy.get('.blogObject')
                    .contains('Article about testing').should('not.exist')
            })

            it.only('Blogs are sorted based on likes', function() {
                cy.contains('Add new blog')
                    .click()
                cy.get('#title')
                    .type('Second article about testing')
                cy.get('#author')
                    .type('TestiTimo')
                cy.get('#url')
                    .type('tt.fi/second-article-about-testing')
                cy.get('#addBlog')
                    .click()
                cy.get('#blogs').last()
                    .contains('Second article about testing')
                cy.get('button:last')
                    .click()
                cy.contains('like')
                    .click()
                cy.get('#blogs').first()
                    .contains('Second article about testing')

            })
        })
    })
})