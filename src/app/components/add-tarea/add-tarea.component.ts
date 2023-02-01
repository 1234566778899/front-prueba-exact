import { Estado } from './../../models/Estado';
import { TareaService } from './../../services/tarea/tarea.service';
import { Tarea } from './../../models/Tarea';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent implements OnInit {
  tareas!: Tarea[];
  formTarea!: FormGroup;
  constructor(private tareaService: TareaService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTareas();
    this.loadForm();
  }
  loadForm() {
    this.formTarea = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
  getTareas() {
    this.tareaService.listar().subscribe(
      (response: Tarea[]) => {
        this.tareas = response;
        console.log(this.tareas);
      }
    )
  }
  verificarEliminar(id: number) {
    let idx = this.tareas.findIndex(x => x.id == id);
    this.tareas[idx].opcion = true;
  }
  cancelarEliminar(id: number) {
    let idx = this.tareas.findIndex(x => x.id == id);
    this.tareas[idx].opcion = false;
  }
  registrarTarea() {
    if (this.formTarea.invalid) {
      this.snackBar.open('DEBES ESCRIBIR UNA TAREA', 'OK', { duration: 3000 })
    } else {
      let _estado: Estado = {
        id: 1
      }
      let tarea: Tarea = {
        id: 0,
        descripcion: this.formTarea.get('descripcion')?.value,
        estado: _estado
      }

      this.tareaService.insertar(tarea).subscribe({
        next: (response: Tarea) => {
          this.getTareas();
          this.formTarea.get('descripcion')?.setValue('');
          this.snackBar.open('REGISTRADO CORRECTAMENTE', 'OK', { duration: 3000 })
        }, error: e => {
          this.snackBar.open(e.message, 'OK', { duration: 3000 })
        }
      })
    }
  }
  eliminar(tarea: Tarea) {
    tarea.estado.id = 3;
    this.tareaService.update(tarea, tarea.id).subscribe({
      next: (response: Tarea) => {
        this.getTareas();
        this.snackBar.open('SE ELMINADO CORRECTAMENTE', 'OK', { duration: 3000 });
      }
    })
  }

  cambiarEstado(estado_id: number, tarea_id: number) {
    let _estado: Estado = {
      id: estado_id
    }
    let tarea: Tarea = {
      id: tarea_id,
      descripcion: '',
      estado: _estado
    }
    this.tareaService.update(tarea, tarea_id).subscribe({
      next: (response: Tarea) => {
        this.getTareas();
      }
    })
  }
}
