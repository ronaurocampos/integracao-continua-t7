import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Especialidade } from '../../../model/especialidade';
import { Profissional } from '../../../model/profissional';
import { Unidade } from '../../../model/unidade';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { ProfissionalService } from '../../../service/profissional.service';
import { UnidadeService } from '../../../service/unidade.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-profissional-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './profissional-form.component.html',
  styles: ``
})
export class ProfissionalFormComponent implements ICrudForm<Profissional>, OnInit {

  private servico = inject(ProfissionalService);
  private servicoEspecialidade = inject(EspecialidadeService);
  private servicoUnidade = inject(UnidadeService);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  ngOnInit(): void {
    this.servicoEspecialidade.consultar().subscribe({
      next: resposta => this.especialidades = resposta
    });
    
    this.servicoUnidade.consultar().subscribe({
      next: resposta => this.unidades = resposta
    });

    const id = this.rota.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.consultarPorId(+id).subscribe({
        next: resposta => this.registro = resposta
      });
    }
  }

  registro: Profissional = <Profissional>{};
  especialidades: Especialidade[] = [];
  unidades: Unidade[] = [];

  compareById = (a: any, b: any) => {
    return a && b && a.id == b.id || !a && !b;
  }
  
  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/profissional-list']);
      }
    });
  }

}
