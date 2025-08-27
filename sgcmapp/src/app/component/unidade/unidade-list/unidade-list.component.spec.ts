import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeListComponent } from './unidade-list.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';

describe('UnidadeListComponent', () => {
  let component: UnidadeListComponent;
  let fixture: ComponentFixture<UnidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UnidadeListComponent,
        RouterModule.forRoot(routes)],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
