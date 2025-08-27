import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Atendimento } from '../model/atendimento';
import { AtendimentoService } from './atendimento.service';

describe('AtendimentoService', () => {
  let service: AtendimentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AtendimentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar HttpClient ao executar o método consultar()', () => {
    service.consultar().subscribe();
    const endpoint = '/atendimento/consultar';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.params.get('termoBusca')).toBeNull();
    expect(testeHttp.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultar(termoBusca)', () => {
    const termoBusca = 'teste';
    service.consultar(termoBusca).subscribe();
    const endpoint = '/atendimento/consultar';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.params.get('termoBusca')).toBe(termoBusca);
    expect(testeHttp.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultarPorId()', () => {
    const id = 1;
    service.consultarPorId(id).subscribe();
    const endpoint = `/atendimento/consultar/${id}`;
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
    const objeto = <Atendimento>{};
    service.salvar(objeto).subscribe();
    const endpoint = '/atendimento/inserir';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.body).toEqual(objeto);
    expect(testeHttp.request.method).toBe('POST');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
    const objeto = <Atendimento>{id: 1};
    service.salvar(objeto).subscribe();
    const endpoint = '/atendimento/atualizar';
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.body).toEqual(objeto);
    expect(testeHttp.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método remover()', () => {
    const id = 1;
    service.remover(id).subscribe();
    const endpoint = `/atendimento/remover/${id}`;
    const testeHttp = httpTestingController.expectOne(req => {
      let url = new URL(req.url);
      return url.pathname == endpoint;
    });
    expect(testeHttp.request.method).toBe('DELETE');
  });
});
