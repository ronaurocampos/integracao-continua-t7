import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profissional } from '../../../model/profissional';
import { ProfissionalService } from '../../../service/profissional.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ICrudList } from '../../i-crud-list';

@Component({
  selector: 'app-profissional-list',
  imports: [RouterLink, BarraComandosComponent],
  templateUrl: './profissional-list.component.html',
  styles: ``
})
export class ProfissionalListComponent implements ICrudList<Profissional>, OnInit {

  private servico = inject(ProfissionalService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Profissional[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: (resposta: Profissional[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão do profissional?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }

}
