import { Observable } from "rxjs";

export interface ICrudService<T> {
    apiUrl: string;
    consultar(termoBusca?: string): Observable<T[]>;
    consultarPorId(id: number): Observable<T>;
    salvar(objeto: T): Observable<number | void>;
    remover(id: number): Observable<void>;
}
