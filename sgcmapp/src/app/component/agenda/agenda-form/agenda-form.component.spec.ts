import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { AgendaFormComponent } from './agenda-form.component';

describe('AgendaFormComponent', () => {
  let component: AgendaFormComponent;
  let fixture: ComponentFixture<AgendaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AgendaFormComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});