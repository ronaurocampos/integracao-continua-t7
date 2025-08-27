import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Paciente } from '../../../model/paciente';
import { PacienteService } from '../../../service/paciente.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-paciente-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './paciente-form.component.html',
  styles: ``
})
export class PacienteFormComponent implements ICrudForm<Paciente>, OnInit {

  private servico = inject(PacienteService);
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

  registro: Paciente = <Paciente>{};
  
  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/paciente-list']);
      }
    });
  }

}
