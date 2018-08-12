import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from 'node_modules/@angular/forms';
import { Observable } from 'node_modules/rxjs';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'node_modules/rxjs/operators';
import { HttpClient } from 'node_modules/@angular/common/http';
import { ComboboxConfig } from './Combobox';
import { MatFormField } from 'node_modules/@angular/material';

@Component({
  selector: 'combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})

export class ComboboxComponent implements OnInit {
  @ViewChild(MatFormField, { read: ElementRef }) formFieldEl: ElementRef;

  @Input() config: ComboboxConfig;
  @Input() dataSource: Observable<any[]> | undefined;

  control = new FormControl();
  filteredItems$: Observable<any[]>;

  private _searchInclude: boolean = true;

  constructor(private http: HttpClient,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.filteredItems$ = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(val => this._filter(val))
    );
  }

  set setWitdth(val: string) {
    this.renderer.setStyle(this.formFieldEl.nativeElement, 'width', val);
  }

  set selectedValue(value: any) {
    this._filter(value, this.config.value).subscribe(e => {
      this.control.setValue(e[0]);
    });
  }

  get selectedText() {
    return this.control.value[this.config.text];
  }

  get selectedValue() {
    return this.control.value[this.config.value];
  }

  get selectedItem() {
    if (typeof this.control.value === "object") {
      return this.control.value;
    }
    return undefined;
  }

  get isRequired() {
    return this.config.required;
  }

  get errors() {
    return this.control.errors;
  }

  private getData(): Observable<any[]> {
    return this.http.get<any[]>(this.config.api);
  }

  private getDataSource(): Observable<any[]> {
    if (this.dataSource) {
      return this.dataSource;
    }
    return this.getData();
  }

  private getFilterValue(value: any, propertyName?: string): string {
    if (!value) {
      return value;
    }
    let filterValue = value.toString();
    if (typeof value === "object" && propertyName && propertyName in value) {
      filterValue = value[propertyName].toString();
    }
    filterValue = filterValue.toLowerCase();
    return filterValue;
  }

  private _filter(value: any, propertyName?: string): Observable<any[]> {
    this._searchInclude = typeof value === "string";

    const filterValue = this.getFilterValue(value, propertyName);
    propertyName = propertyName || this.config.text;

    return this
      .getDataSource()
      .pipe(
        map(response => {
          var filteredOptions = response
            .filter(option =>
              this.filterOption(option, propertyName, filterValue)
            );
          return filteredOptions;
        })
      );
  }

  private filterOption(option: any, propertyName: string, filterValue: string): boolean {
    var value = option[propertyName].toString().toLowerCase();
    if (this._searchInclude) {
      return value.indexOf(filterValue) !== -1;
    }
    return value === filterValue;
  }
} 
