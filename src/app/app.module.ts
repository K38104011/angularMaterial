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

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    ComboboxComponent
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
