describe('Gerenciar pacientes', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav a').contains('Pacientes').click();
  });

  it('deve ser capaz de criar um novo paciente', () => {
    cy.get('#add').click();

    cy.get('input[name="nome"]').type('Cristiana Marques Passos');
    cy.get('input[name="email"]').type('cristiana.passos@gmail.com');
    cy.get('input[name="telefone"]').type('(68) 97233-5516');
    cy.get('input[name="dataNascimento"]').type('1983-06-29');
    cy.get('select[name="grupoSanguineo"]').select('AB+');
    cy.get('select[name="sexo"]').select('Feminino');
    cy.get('input[name="cep"]').type('69920-148');
    cy.get('input[name="endereco"]').type('Rua Javarí, 325 - Conjunto Rui Lino');
    cy.get('select[name="estado"]').select('Acre');
    cy.get('input[name="cidade"]').type('Rio Branco');

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
          colunas[1]?.textContent == 'Cristiana Marques Passos' &&
          colunas[2]?.textContent == 'cristiana.passos@gmail.com' &&
          colunas[3]?.textContent == '(68) 97233-5516' &&
          colunas[4]?.textContent == '29/06/1983' &&
          colunas[5]?.textContent == 'AB_POSITIVO' &&
          colunas[6]?.textContent == 'F' &&
          colunas[7]?.textContent == '69920-148' &&
          colunas[8]?.textContent == 'Rua Javarí, 325 - Conjunto Rui Lino' &&
          colunas[9]?.textContent == 'AC' &&
          colunas[10]?.textContent == 'Rio Branco'
        );
      });
      expect(encontrado).to.be.true;
    });
  });
});
