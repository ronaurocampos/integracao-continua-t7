import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Unidade } from '../../../model/unidade';
import { UnidadeService } from '../../../service/unidade.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-unidade-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './unidade-form.component.html',
  styles: ``
})
export class UnidadeFormComponent implements ICrudForm<Unidade>, OnInit {

  private servico = inject(UnidadeService);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.rota.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.consultarPorId(+id).subscribe({
        next: resposta => this.registro = resposta
      });
    }
  }

  registro: Unidade = <Unidade>{};
  
  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/config/unidade-list']);
      }
    });
  }

}
