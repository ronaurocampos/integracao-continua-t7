import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Convenio } from '../model/convenio';
import { ConvenioService } from './convenio.service';

describe('ConvenioService', () => {
  let service: ConvenioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ConvenioService);
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
      const endpoint = '/convenio/consultar';
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
      const endpoint = '/convenio/consultar';
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
      const endpoint = `/convenio/consultar/${id}`;
      const testeHttp = httpTestingController.expectOne(req => {
        let url = new URL(req.url);
        return url.pathname == endpoint;
      });
      expect(testeHttp.request.method).toBe('GET');
    });
  
    it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
      const objeto = <Convenio>{};
      service.salvar(objeto).subscribe();
      const endpoint = '/convenio/inserir';
      const testeHttp = httpTestingController.expectOne(req => {
        let url = new URL(req.url);
        return url.pathname == endpoint;
      });
      expect(testeHttp.request.body).toEqual(objeto);
      expect(testeHttp.request.method).toBe('POST');
    });
  
    it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
      const objeto = <Convenio>{id: 1};
      service.salvar(objeto).subscribe();
      const endpoint = '/convenio/atualizar';
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
      const endpoint = `/convenio/remover/${id}`;
      const testeHttp = httpTestingController.expectOne(req => {
        let url = new URL(req.url);
        return url.pathname == endpoint;
      });
      expect(testeHttp.request.method).toBe('DELETE');
    });
});
