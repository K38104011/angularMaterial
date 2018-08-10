import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from '../../../../node_modules/rxjs/operators';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { ComboboxConfig, ComboboxItem } from './Combobox';

@Component({
  selector: 'combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})

export class ComboboxComponent implements OnInit {
  @Input() config: ComboboxConfig;

  control = new FormControl();
  filteredItems$: Observable<ComboboxItem[]>;

  constructor(private http: HttpClient) { }

  getData(): Observable<ComboboxItem[]> {
    return this.http.get<ComboboxItem[]>(this.config.Api);
  }

  ngOnInit() {
    this.filteredItems$ = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(val => this._filter(val))
    );
  }

  private _filter(value: string): Observable<ComboboxItem[]> {
    const filterValue = value.toLowerCase();
    return this
      .getData()
      .pipe(
        map(response => {
          return response.filter(option => option.Text.toLocaleLowerCase().indexOf(filterValue) === 0);
        })
      );
  }
} 
