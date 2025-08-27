describe('Gerenciar profissionais', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav a').contains('Profissionais').click();
  });

  it('deve ser capaz de criar um novo profissional', () => {
    cy.get('#add').click();

    cy.get('input[name="nome"]').type('Marlene Portugal Ferreira');
    cy.get('input[name="registroConselho"]').type('CRM/AC 364');
    cy.get('select[name="especialidade"]').select('Dermatologia');
    cy.get('select[name="unidade"]').select('Bela Vista');
    cy.get('input[name="telefone"]').type('(68) 96985-9135');
    cy.get('input[name="email"]').type('marlene.ferreira@gmail.com');

    const mensagens: string[] = [];
    cy.on('window:alert', mensagem => mensagens.push(mensagem));

    cy.get('input[type="submit"]').click();

    cy.wrap(mensagens).should('have.length', 2).then(() => {
      expect(mensagens[0]).to.contain('ID gerado: 6');
      expect(mensagens[1]).to.contain('Operação realizada com sucesso.');
    });

    cy.get('table tbody tr').then((linhas) => {
      const encontrado = Array.from(linhas).some((linha) => {
        const colunas = linha.querySelectorAll('td');
        return (
          colunas[1]?.textContent == 'Marlene Portugal Ferreira' &&
          colunas[2]?.textContent == 'CRM/AC 364' &&
          colunas[3]?.textContent == 'Dermatologia' &&
          colunas[4]?.textContent == 'Bela Vista' &&
          colunas[5]?.textContent == '(68) 96985-9135' &&
          colunas[6]?.textContent == 'marlene.ferreira@gmail.com'
        );
      });
      expect(encontrado).to.be.true;
    });
  });
});
