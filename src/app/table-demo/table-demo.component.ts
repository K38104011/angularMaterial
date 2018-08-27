import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css']
})

export class TableDemoComponent implements OnInit, AfterViewInit {
  @ViewChild("table") table: MatTable<any>;

  displayedColumns: string[] = ['name', 'actions'];
  todoFormArray = new FormArray([]);
  masterForm = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.masterForm.addControl('formArray', this.todoFormArray);
    let arrayForm = this.masterForm.controls.formArray as FormArray;
    let row = this.createRowForm();
    row.controls.name.setValue("Giang")
    arrayForm.controls.push(row);
    console.log(this.masterForm);

  }

  private createRowForm() : FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      guid: new FormControl(Date.now())
    });
  }

  ngAfterViewInit(): void {
  }


  addRow() {
    if (this.validateBeforeAddRow()) {
      this.todoFormArray.push(this.createRowForm());
      this.table.renderRows();
    }
  }

  validateBeforeAddRow() : boolean {

    return true;
  }

  delete(guid: number) {
    this.todoFormArray.controls = this.todoFormArray.controls.filter(formGroup => {
      let fg = formGroup as FormGroup;
      let guidVal = fg.controls.guid.value;
      return guidVal != guid;
    })
    this.table.renderRows();
  }

}
