import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-db.service';

import { ReactiveFormsModule, FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoRoutingModule } from './/todo-routing.module';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { MatTodoModule } from './/mat-todo.module';
import { ComboboxComponent } from './controls/combobox/combobox.component';
import { PanelComponent } from './controls/panel/panel.component';
import { PanelDemoComponent } from './panel-demo/panel-demo.component';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { TableInputComponent } from './table-demo/table-input/table-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    ComboboxComponent,
    PanelComponent,
    PanelDemoComponent,
    TableDemoComponent,
    TableInputComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }),
    FormsModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    MatTodoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
