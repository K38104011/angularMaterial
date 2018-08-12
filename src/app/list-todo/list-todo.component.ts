import { Component, OnInit, ViewChild   } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComboboxConfig } from '../controls/combobox/Combobox';
import { ComboboxComponent } from '../controls/combobox/combobox.component';

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
    this.comboboxConfig3 = new ComboboxConfig();
    this.comboboxConfig3.text = "Name";
    this.comboboxConfig3.value = "Id";
  }

  public getHeroes() : Observable<any[]> {
    return this.http.get<any[]>("api/heroes");
  }

  public getSampleData() : Observable<any[]> {
    var data = [
      { Name: "ABC", Id: 1 },
      { Name: "BAC", Id: 2 },
      { Name: "CAB", Id: 3 }
    ];
    return of(data);
  }

  public handleClick() : void {
    //console.log(this.combobox1.control.value);
    //console.log(this.combobox2.control.value);
    this.combobox3.selectedValue = 1;
    // console.log(this.combobox3.selectedText);
    // console.log(this.combobox3.selectedValue);
    // this.combobox3.selectedValue = null;
    
    console.log(this.combobox3.isRequired);
    console.log(this.combobox3.errors);

    //console.log(this.combobox3.dataSource.subscribe(x => console.log(x)));

  }
}
