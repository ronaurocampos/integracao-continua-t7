import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Convenio } from '../../../model/convenio';
import { ConvenioService } from '../../../service/convenio.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ICrudList } from '../../i-crud-list';

@Component({
  selector: 'app-convenio-list',
  imports: [RouterLink, BarraComandosComponent],
  templateUrl: './convenio-list.component.html',
  styles: ``
})
export class ConvenioListComponent implements ICrudList<Convenio>, OnInit {

  private servico = inject(ConvenioService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Convenio[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: (resposta: Convenio[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão do convênio?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }

}
