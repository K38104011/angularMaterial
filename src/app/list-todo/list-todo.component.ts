import { Component, OnInit   } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComboboxConfig, ComboboxItem } from '../controls/combobox/Combobox';
import { map, flatMap, switchMap } from 'node_modules/rxjs/operators';

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
  dataList: any[] = [];
  comboboxConfig: ComboboxConfig;

  private heroesUrl = 'api/todos';
  constructor(
    private http: HttpClient) { }

  myControl = new FormControl();
  options: User[] = [
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' }
  ];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.comboboxConfig = { Api: this.heroesUrl };
  }

  public getHeroes() : Observable<ComboboxItem[]> {
    return this.http.get<any[]>("api/heroes")
      .pipe(
        map(response => response.map(item => new ComboboxItem(item.name, item.name)))
      )
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
