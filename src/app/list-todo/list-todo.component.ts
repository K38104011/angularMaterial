import { Component, OnInit, ViewChild   } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  comboboxConfig1: ComboboxConfig;
  comboboxConfig3: ComboboxConfig;

  constructor() { }

  ngOnInit() {
    this.comboboxConfig1 = new ComboboxConfig();
    this.comboboxConfig1.api = "api/heroes";
    this.comboboxConfig1.text = "name";
    this.comboboxConfig1.value = "id";
    this.comboboxConfig1.required = true;

    this.comboboxConfig3 = new ComboboxConfig();
    this.comboboxConfig3.text = "Name";
    this.comboboxConfig3.value = "Id";
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
    console.log(this.combobox1.selectedItem);
    console.log(this.combobox1.selectedText);
    console.log(this.combobox1.selectedValue);

    this.combobox3.setWitdth = "300px";
    this.combobox3.selectedValue = 1;
    console.log(this.combobox3.isRequired);
    console.log(this.combobox3.errors);
    console.log(this.combobox3.selectedItem);
  }
}
