import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const ERRO_HTTP: Record<number, string> = {
  404: 'Recurso não encontrado.',
  500: 'Erro interno do servidor.'
}

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(erro => {
      let mensagemErro = ERRO_HTTP[erro.status] || erro.error?.message || 'Falha na requisição';
      alert(mensagemErro);
      return throwError(() => erro);
    })
  );
};
