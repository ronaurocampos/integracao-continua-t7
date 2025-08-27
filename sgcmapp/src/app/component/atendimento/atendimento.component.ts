import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Atendimento } from '../../model/atendimento';
import { AtendimentoService } from '../../service/atendimento.service';
import { BarraComandosComponent } from '../barra-comandos/barra-comandos.component';
import { ICrudList } from '../i-crud-list';

@Component({
  selector: 'app-atendimento',
  imports: [CommonModule, BarraComandosComponent],
  templateUrl: './atendimento.component.html',
  styles: ``
})
export class AtendimentoComponent implements ICrudList<Atendimento>, OnInit {

  private servico = inject(AtendimentoService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Atendimento[] = [];

  consultar(termoBusca?: string): void {
    const status = ['CHEGADA', 'ATENDIMENTO'];
    this.servico.consultar(termoBusca, status).subscribe({
      next: (resposta: Atendimento[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    throw new Error('Method not implemented.');
  }

  atualizarStatus(id: number): void {
    if (confirm('Confirma alteração no status do atendimento?')) {
      this.servico.atualizarStatus(id).subscribe({
        next: status => alert(`Status alterado para ${status}`),
        complete: () => this.consultar()
      });
    }
  }

}
