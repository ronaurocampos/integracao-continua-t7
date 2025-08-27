export interface ICrudList<T> {
    registros: T[];
    consultar(termoBusca?: string): void;
    remover(id: number): void;
}
