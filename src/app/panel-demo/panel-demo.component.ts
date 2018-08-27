import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-panel-demo',
  templateUrl: './panel-demo.component.html',
  styleUrls: ['./panel-demo.component.css']
})
export class PanelDemoComponent implements OnInit {
  @ViewChild("row", { read: TemplateRef }) rowTemplate : TemplateRef<any>;
  data: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.data = of([
      { name: "Giang", id: 1 },
      { name: "Test", id: 2 }
    ])
  }

}
