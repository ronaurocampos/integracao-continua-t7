import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Paciente } from '../model/paciente';
import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let servico: PacienteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    servico = TestBed.inject(PacienteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(servico).toBeTruthy();
  });

  it('deve chamar HttpClient ao executar o método consultar()', () => {
    servico.consultar().subscribe();
    const endpoint = '/paciente/consultar';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.params.get('termoBusca')).toBeNull();
    expect(testeHttp.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultar(termoBusca)', () => {
    const termoBusca = 'teste';
    servico.consultar(termoBusca).subscribe();
    const endpoint = '/paciente/consultar';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.params.get('termoBusca')).toBe(termoBusca);
    expect(testeHttp.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultarPorId()', () => {
    const id = 1;
    servico.consultarPorId(id).subscribe();
    const endpoint = `/paciente/consultar/${id}`;
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
    const objeto = <Paciente>{};
    servico.salvar(objeto).subscribe();
    const endpoint = '/paciente/inserir';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.body).toEqual(objeto);
    expect(testeHttp.request.method).toBe('POST');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
    const objeto = <Paciente>{id: 1};
    servico.salvar(objeto).subscribe();
    const endpoint = '/paciente/atualizar';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.body).toEqual(objeto);
    expect(testeHttp.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método remover()', () => {
    const id = 1;
    servico.remover(id).subscribe();
    const endpoint = `/paciente/remover/${id}`;
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.method).toBe('DELETE');
  });
});
