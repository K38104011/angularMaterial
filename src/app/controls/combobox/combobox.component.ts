import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from 'node_modules/@angular/forms';
import { Observable } from 'node_modules/rxjs';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'node_modules/rxjs/operators';
import { HttpClient } from 'node_modules/@angular/common/http';
import { ComboboxConfig, ComboboxItem } from './Combobox';

@Component({
  selector: 'combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})

export class ComboboxComponent implements OnInit {
  @Input() config: ComboboxConfig;
  @Input() dataSource: Observable<ComboboxItem[]>|undefined;

  control = new FormControl();
  filteredItems$: Observable<ComboboxItem[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.filteredItems$ = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(val => this._filter(val))
    );
  }

  public getSelectedValue()
  {
    return this.control.value;
  }

  public DisplayTemplate(item: ComboboxItem) : string {
    if (item == null) {
      return '';
    }
    return item[item.TemplateDisplay];
  }

  public displayFn(item: ComboboxItem) {
    if (item == null) {
      return '';
    }
    return item[item.TemplateDisplay];
  }

  private getData(): Observable<ComboboxItem[]> {
    return this.http.get<ComboboxItem[]>(this.config.Api);
  }

  private getDataSource() : Observable<ComboboxItem[]>
  {
    if (this.dataSource){
      return this.dataSource;
    }
    return this.getData();
  }

  private _filter(item: any): Observable<ComboboxItem[]> {
    var selected = <ComboboxItem> item;
    const filterValue =  selected && selected[this.config.SearchValue] ? selected[this.config.SearchValue].toLowerCase() : '' ;
    return this
      .getDataSource()
      .pipe(
        map(response => {
          return response.filter(option => option[this.config.SearchValue].toLocaleLowerCase().indexOf(filterValue) === 0);
        })
      );
  }
} 
