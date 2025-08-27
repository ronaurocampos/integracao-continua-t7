import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-comandos',
  imports: [RouterLink, FormsModule],
  templateUrl: './barra-comandos.component.html',
  styles: ``
})
export class BarraComandosComponent {

  eventoBusca = output<string>();
  linkForm = input<string>();

  buscar(termoBusca: string) {
    if (termoBusca.length >= 3 || termoBusca.length == 0) {
      this.eventoBusca.emit(termoBusca);
    }
  }

}
