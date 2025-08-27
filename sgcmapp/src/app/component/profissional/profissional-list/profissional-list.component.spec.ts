import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { ProfissionalListComponent } from './profissional-list.component';

describe('ProfissionalListComponent', () => {
  let component: ProfissionalListComponent;
  let fixture: ComponentFixture<ProfissionalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfissionalListComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfissionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
