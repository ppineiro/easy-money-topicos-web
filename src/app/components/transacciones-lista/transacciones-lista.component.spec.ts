import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesListaComponent } from './transacciones-lista.component';

describe('TransaccionesListaComponent', () => {
  let component: TransaccionesListaComponent;
  let fixture: ComponentFixture<TransaccionesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
