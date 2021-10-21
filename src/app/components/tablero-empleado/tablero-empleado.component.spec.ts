import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroEmpleadoComponent } from './tablero-empleado.component';

describe('TableroEmpleadoComponent', () => {
  let component: TableroEmpleadoComponent;
  let fixture: ComponentFixture<TableroEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
