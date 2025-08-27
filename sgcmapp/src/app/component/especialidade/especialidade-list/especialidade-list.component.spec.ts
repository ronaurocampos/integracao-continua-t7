import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeListComponent } from './especialidade-list.component';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { provideHttpClient } from '@angular/common/http';

describe('EspecialidadeListComponent', () => {
  let component: EspecialidadeListComponent;
  let fixture: ComponentFixture<EspecialidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EspecialidadeListComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
