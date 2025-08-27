describe('Gerenciar convênios', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav a').contains('Convênios').click();
  });

  it('deve ser capaz de criar um novo convênio', () => {
    cy.get('#add').click();

    cy.get('input[name="nome"]').type('Real');
    cy.get('input[name="razaoSocial"]').type('Real Central de Convênios Ltda');
    cy.get('input[name="cnpj"]').type('02.354.015/0001-83');
    cy.get('input[name="representante"]').type('Carla Chaves Dutra');
    cy.get('input[name="email"]').type('contato@realconvenios.com.br');
    cy.get('input[name="telefone"]').type('(68) 3425-7011');
    cy.get('input[name="ativo"]').check();

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
          colunas[1]?.textContent == 'Real' &&
          colunas[2]?.textContent == 'Real Central de Convênios Ltda' &&
          colunas[3]?.textContent == '02.354.015/0001-83' &&
          colunas[4]?.textContent == 'Carla Chaves Dutra' &&
          colunas[5]?.textContent == 'contato@realconvenios.com.br' &&
          colunas[6]?.textContent == '(68) 3425-7011' &&
          colunas[7]?.textContent == 'Sim'
        );
      });
      expect(encontrado).to.be.true;
    });
  });
});
