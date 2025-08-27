import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Especialidade } from '../../../model/especialidade';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ICrudList } from '../../i-crud-list';

@Component({
  selector: 'app-especialidade-list',
  imports: [RouterLink, BarraComandosComponent],
  templateUrl: './especialidade-list.component.html',
  styles: ``
})
export class EspecialidadeListComponent implements ICrudList<Especialidade>, OnInit {

  private servico = inject(EspecialidadeService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Especialidade[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: (resposta: Especialidade[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão da especialidade?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }

}
