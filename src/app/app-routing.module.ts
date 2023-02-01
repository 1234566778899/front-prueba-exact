import { AddTareaComponent } from './components/add-tarea/add-tarea.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'add-tarea', component: AddTareaComponent },
  { path: '**', component: AddTareaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
