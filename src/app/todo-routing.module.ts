import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ListTodoComponent } from './list-todo/list-todo.component';
import { PanelDemoComponent } from './panel-demo/panel-demo.component';
import { TableDemoComponent } from './table-demo/table-demo.component';

const routes: Routes = [
  { path: '', component: ListTodoComponent },
  { path: 'paneldemo', component: PanelDemoComponent },
  { path: 'tabledemo', component: TableDemoComponent }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TodoRoutingModule { }
