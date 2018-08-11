import { Component, OnInit, ViewChild   } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComboboxConfig, ComboboxItem } from '../controls/combobox/Combobox';
import { map } from 'node_modules/rxjs/operators';
import { ComboboxComponent } from '../controls/combobox/combobox.component';

export interface User {
  name: string;
}

export class Hero {
  id: number;
  name: string; 
}

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  @ViewChild('c1') combobox1: ComboboxComponent;
  @ViewChild('c2') combobox2: ComboboxComponent;
  @ViewChild('c3') combobox3: ComboboxComponent;


  comboboxConfig3: ComboboxConfig;

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
    //this.comboboxConfig = { Api: "api/todos" };
    this.comboboxConfig3 = new ComboboxConfig();
    this.comboboxConfig3.SearchValue = "Name";
  }

  public getHeroes() : Observable<ComboboxItem[]> {
    return this.http.get<any[]>("api/heroes")
      .pipe(
        map(response => response.map(item => new ComboboxItem()))
      )
  }

  public getSampleData() : Observable<ComboboxItem[]> {
    var data = [
      { Name: "ABC", Id: 1 },
      { Name: "BAC", Id: 2 },
      { Name: "CAB", Id: 3 }
    ];
    return of(data.map(item => {
      const result = { TemplateDisplay : "Name", ...item}
      return result;
    }));
  }

  public handleClick() : void {
    //console.log(this.combobox1.control.value);
    //console.log(this.combobox2.control.value);
    console.log(this.combobox3.getSelectedValue());
    //console.log(this.combobox3.dataSource.subscribe(x => console.log(x)));

  }
}
