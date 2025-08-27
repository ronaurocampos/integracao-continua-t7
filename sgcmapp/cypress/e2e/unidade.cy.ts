describe('Gerenciar unidades', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav a').contains('Unidades').click({ force: true });
  });

  it('deve ser capaz de criar uma nova unidade', () => {
    cy.get('#add').click();

    cy.get('input[name="nome"]').type('Triângulo');
    cy.get('input[name="endereco"]').type('Via Chico Mendes, 1780 - Triângulo');

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
          colunas[1]?.textContent == 'Triângulo' &&
          colunas[2]?.textContent == 'Via Chico Mendes, 1780 - Triângulo'
        );
      });
      expect(encontrado).to.be.true;
    });
  });
});
