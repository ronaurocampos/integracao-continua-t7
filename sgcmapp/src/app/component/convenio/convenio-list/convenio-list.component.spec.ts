import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ConvenioListComponent } from './convenio-list.component';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';

describe('ConvenioListComponent', () => {
  let component: ConvenioListComponent;
  let fixture: ComponentFixture<ConvenioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConvenioListComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvenioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
