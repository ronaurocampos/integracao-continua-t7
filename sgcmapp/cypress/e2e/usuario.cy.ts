describe('Gerenciar usuários', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav a').contains('Usuários').click({ force: true });
  });

  it('deve ser capaz de criar uma nova usuário', () => {
    cy.get('#add').click();

    cy.get('input[name="nomeCompleto"]').type('Laura Costa Sarkis');
    cy.get('input[name="nomeUsuario"]').type('laura');
    cy.get('input[name="senha"]').type('laura');
    cy.get('input[name="ativo"]').check();
    cy.get('select[name="papel"]').select('ADMIN');

    const mensagens: string[] = [];
    cy.on('window:alert', mensagem => mensagens.push(mensagem));

    cy.get('input[type="submit"]').click();

    cy.wrap(mensagens).should('have.length', 2).then(() => {
      expect(mensagens[0]).to.contain('ID gerado: 4');
      expect(mensagens[1]).to.contain('Operação realizada com sucesso.');
    });

    cy.get('table tbody tr').then((linhas) => {
      const encontrado = Array.from(linhas).some((linha) => {
        const colunas = linha.querySelectorAll('td');
        return (
          colunas[1]?.textContent == 'Laura Costa Sarkis' &&
          colunas[2]?.textContent == 'laura' &&
          colunas[3]?.textContent == 'Sim' &&
          colunas[4]?.textContent == 'ADMIN'
        );
      });
      expect(encontrado).to.be.true;
    });
  });
});
