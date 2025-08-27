import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { UnidadeFormComponent } from './unidade-form.component';

describe('UnidadeFormComponent', () => {
  let component: UnidadeFormComponent;
  let fixture: ComponentFixture<UnidadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UnidadeFormComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
