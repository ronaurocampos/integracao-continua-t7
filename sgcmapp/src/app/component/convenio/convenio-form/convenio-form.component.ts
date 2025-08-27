import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Convenio } from '../../../model/convenio';
import { ConvenioService } from '../../../service/convenio.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-convenio-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './convenio-form.component.html',
  styles: ``
})
export class ConvenioFormComponent implements ICrudForm<Convenio>, OnInit {

  private servico = inject(ConvenioService);
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

  registro: Convenio = <Convenio>{};
  
  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/convenio-list']);
      }
    });
  }

}
