import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.css']
})
export class TableInputComponent implements OnInit {
  @Input() value: string; 
  control = new FormControl("", [Validators.required]);

  constructor() { }

  ngOnInit() {
    this.control.setValue(this.value);
  }

}
