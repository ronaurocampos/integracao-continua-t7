import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { AtendimentoComponent } from './atendimento.component';

describe('AtendimentoComponent', () => {
  let component: AtendimentoComponent;
  let fixture: ComponentFixture<AtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AtendimentoComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
