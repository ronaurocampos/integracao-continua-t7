import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ICrudList } from '../../i-crud-list';

@Component({
  selector: 'app-usuario-list',
  imports: [RouterLink, BarraComandosComponent],
  templateUrl: './usuario-list.component.html',
  styles: ``
})
export class UsuarioListComponent implements ICrudList<Usuario>, OnInit {

  private servico = inject(UsuarioService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Usuario[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: (resposta: Usuario[]) => this.registros = resposta
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão do usuário?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }

}
