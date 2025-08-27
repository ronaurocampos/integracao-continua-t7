import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Especialidade } from '../../../model/especialidade';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-especialidade-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './especialidade-form.component.html',
  styles: ``
})
export class EspecialidadeFormComponent implements ICrudForm<Especialidade>, OnInit {

  private servico = inject(EspecialidadeService);
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

  registro: Especialidade = <Especialidade>{};
  
  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/config/especialidade-list']);
      }
    });
  }

}
