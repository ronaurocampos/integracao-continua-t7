import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { ConvenioFormComponent } from './convenio-form.component';

describe('ConvenioFormComponent', () => {
  let component: ConvenioFormComponent;
  let fixture: ComponentFixture<ConvenioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConvenioFormComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvenioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
