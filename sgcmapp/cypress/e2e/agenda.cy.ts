describe('Agenda', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav a').contains('Agenda').click();
  });

  it('deve criar novo agendamento', () => {
    cy.get('a#add').click();

    cy.get('select#profissional').select('Davi Jesus Mendes');
    cy.get('select#paciente').select('Helen Dutra Vilar');
    cy.get('input#data').type('2025-09-01');
    cy.get('select#hora').select('14:00');
    cy.get('select#convenio').select('Unimed');

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
          colunas[0]?.textContent == '01/09/2025' &&
          colunas[1]?.textContent == '14:00' &&
          colunas[2]?.textContent == 'Helen Dutra Vilar' &&
          colunas[3]?.textContent == 'Davi Jesus Mendes' &&
          colunas[5]?.textContent == 'Unimed'
        );
      });
      expect(encontrado).to.be.true;
    });
  });
});
