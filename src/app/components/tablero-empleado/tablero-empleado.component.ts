import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from 'src/app/shared/api.service';
import { MaquinaModel } from './tablero-empleado.component.model';

@Component({
  selector: 'app-tablero-empleado',
  templateUrl: './tablero-empleado.component.html',
  styleUrls: ['./tablero-empleado.component.css']
})
export class TableroEmpleadoComponent implements OnInit {
  
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  formulario!: FormGroup;
  maquinaModelObj : MaquinaModel = new MaquinaModel();
  maquinaData!: any;
  mostrarBotonAgregar : boolean = false;
  mostrarBotonActualizar : boolean = false;
  
  ngOnInit(): void {
    this.formulario = this.formbuilder.group({
     nombreMaquina : [''],
     numeroSerie : [''],
     casinoDondeSeDeja : [''],
     direccion : [''],
     fecha : ['']
    })
    this.getAllMaquinas();
  }

  postMaquinaDetails() {
    this.maquinaModelObj.nombreMaquina = this.formulario.value.nombreMaquina;
    this.maquinaModelObj.numeroSerie = this.formulario.value.numeroSerie;
    this.maquinaModelObj.casinoDondeSeDeja = this.formulario.value.casinoDondeSeDeja;
    this.maquinaModelObj.direccion = this.formulario.value.direccion;
    this.maquinaModelObj.fecha = this.formulario.value.fecha;

    this.api.postMaquina(this.maquinaModelObj)
    .subscribe(res=>{
      console.log('*******res: ',res);
      alert("Maquina agregada satisfactoriamente");

      let ref = document.getElementById('cancelar');
      ref?.click();
      this.formulario.reset();
      this.getAllMaquinas();
    },
    err=>{
      alert("Se ha presentado un error, no se guardo la maquina");
    }
    )
  }

  getAllMaquinas() {
    this.api.getMaquina()
    .subscribe(res=>{
      this.maquinaData = res;
    })
  }

  deleteMaquina(valor : any) {
    this.api.deleteMaquina(valor.id)
    .subscribe(res=>{
      alert("Maquina eliminada");

      this.getAllMaquinas();
    })
  }

  editMaquina(valor : any) {
    this.mostrarBotonAgregar = false;
    this.mostrarBotonActualizar = true;

    this.maquinaModelObj.id = valor.id;
    this.formulario.controls['nombreMaquina'].setValue(valor.nombreMaquina);
    this.formulario.controls['numeroSerie'].setValue(valor.numeroSerie);
    this.formulario.controls['casinoDondeSeDeja'].setValue(valor.casinoDondeSeDeja);
    this.formulario.controls['direccion'].setValue(valor.direccion);
    this.formulario.controls['fecha'].setValue(valor.fecha);
  }

  updateMaquina() {
    this.maquinaModelObj.nombreMaquina = this.formulario.value.nombreMaquina;
    this.maquinaModelObj.numeroSerie = this.formulario.value.numeroSerie;
    this.maquinaModelObj.casinoDondeSeDeja = this.formulario.value.casinoDondeSeDeja;
    this.maquinaModelObj.direccion = this.formulario.value.direccion;
    this.maquinaModelObj.fecha = this.formulario.value.fecha;

    this.api.updateMaquina(this.maquinaModelObj, this.maquinaModelObj.id)
    .subscribe(res=>{
      alert("Maquina actualizada correctamente");

      let ref = document.getElementById('cancelar');
      ref?.click();
      this.formulario.reset();
      this.getAllMaquinas();
    })
  }

  clickAgregarMaquina() {
    this.formulario.reset();
    this.mostrarBotonAgregar = true;
    this.mostrarBotonActualizar = false;
  }

}
