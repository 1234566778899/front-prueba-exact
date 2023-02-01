import { Tarea } from './../../models/Tarea';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) {

  }
  listar() {
    return this.http.get<Tarea[]>(`${base_url}/tareas`);
  }
  insertar(tarea: Tarea) {
    return this.http.post<Tarea>(`${base_url}/tareas`, tarea);
  }
  update(tarea: Tarea, tarea_id: number) {
    return this.http.put<Tarea>(`${base_url}/tareas/${tarea_id}`, tarea)
  }
}
