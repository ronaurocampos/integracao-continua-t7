import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-usuario-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './usuario-form.component.html',
  styles: ``
})
export class UsuarioFormComponent implements ICrudForm<Usuario>, OnInit {

  private servico = inject(UsuarioService);
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

  registro: Usuario = <Usuario>{};
  
  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/config/usuario-list']);
      }
    });
  }

}
