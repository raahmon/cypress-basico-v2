/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    //before ele é inicializado antes de todos...
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatorios e envia o formularo', function () {
        cy.get('#firstName')
            .type('Ramon')
        cy.get('#lastName')
            .type('Nunes')
        cy.get('#email')
            .type('raahonunnes@gmail.com')
        cy.get('#open-text-area')
            .type('OLÁ MUNDO')
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    })
    it('preenchendo os campos e fazendo um texto longo no text box', function () {
        const longText = 'esse é uma maneira mais facil pra utilizar para guardar o texto e eu abrir a variavel dentro do comando.'

        cy.get('#firstName')
            .type('Ramon')
        cy.get('#lastName')
            .type('Nunes')
        cy.get('#email')
            .type('raahonunnes@gmail.com')
        cy.get('#open-text-area')
            .type(longText, {
                delay: 0
            })
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida.', function () {
        cy.get('#firstName')
            .type('Ramon')
        cy.get('#lastName')
            .type('Nunes')
        cy.get('#email')
            .type('ramon.nunes.com.br')
        cy.get('#open-text-area')
            .type('DANDO ERRO NO CODIGO')
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })
    it('TESTANDO O ERRO DO NUMERO DE TELEFONE!!!', () => {
        cy.get('#phone')
            .type('ABCDEFGHIJKLMNOP')
            .should('have.value', '')
    })

    it('exibir mensagem erro quando o telefone se torna obrigatorio mas não é', () => {
        cy.get('#firstName')
            .type('Ramon')
        cy.get('#lastName')
            .type('Nunes')
        cy.get('#email')
            .type('ramon@nunes.com.br')
        cy.get('#phone-checkbox')
            .click()
        cy.get('#open-text-area')
            .type('DANDO ERRO NO CODIGO')
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Ramon')
            .should('have.value', 'Ramon')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Nunes')
            .should('have.value', 'Nunes')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('raahmonunes@gmail.com')
            .should('have.value', 'raahmonunes@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11976782174')
            .should('have.value', '11976782174')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });
    it('envia o formulario com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    });

    it(' alterar todos os locais onde identificamos o botão para posterior clique', () => {
        cy.get('#firstName')
            .type('Ramon')
        cy.get('#lastName')
            .type('Nunes')
        cy.get('#email')
            .type('ramon@nunes.com.br')
        cy.get('#phone-checkbox')
            .click()
        cy.get('#open-text-area')
            .type('DANDO ERRO NO CODIGO')
        cy.contains('.button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });
    it('Marca o tipo de atendimento "FeedBack"', () => {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    });

    it('marca da tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio)
                    .check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    });
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
        cy.get('input[type="checkbox"]')
            .should('be.checked')
            .uncheck()
        cy.get('input[type="checkbox"]')
            .last()
            .should('not.be.checked')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox')
            .check()
            .should('have.value', 'phone')
            .uncheck()
        //coloquei uncheck para inovar mais coisas no codigo!!!
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    });

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um aliás', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    });
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
});