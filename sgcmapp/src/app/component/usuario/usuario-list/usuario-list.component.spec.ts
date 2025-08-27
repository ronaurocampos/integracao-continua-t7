import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { UsuarioListComponent } from './usuario-list.component';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsuarioListComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
