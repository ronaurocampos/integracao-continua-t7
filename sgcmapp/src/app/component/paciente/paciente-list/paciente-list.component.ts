import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Paciente } from '../../../model/paciente';
import { PacienteService } from '../../../service/paciente.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ICrudList } from '../../i-crud-list';

@Component({
  selector: 'app-paciente-list',
  imports: [CommonModule, RouterLink, BarraComandosComponent],
  templateUrl: './paciente-list.component.html',
  styles: ``
})
export class PacienteListComponent implements ICrudList<Paciente>, OnInit {

  private servico = inject(PacienteService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Paciente[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: (resposta: Paciente[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão do paciente?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }

}
