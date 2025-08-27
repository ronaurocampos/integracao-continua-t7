import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Unidade } from '../../../model/unidade';
import { UnidadeService } from '../../../service/unidade.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ICrudList } from '../../i-crud-list';

@Component({
  selector: 'app-unidade-list',
  imports: [RouterLink, BarraComandosComponent],
  templateUrl: './unidade-list.component.html',
  styles: ``
})
export class UnidadeListComponent implements ICrudList<Unidade>, OnInit {

  private servico = inject(UnidadeService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Unidade[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: (resposta: Unidade[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão da unidade?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }

}
