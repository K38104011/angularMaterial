import { Component, OnInit, Input, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, AfterViewInit {
  
  @Input() dataSource: Observable<any>;
  @Input() template: TemplateRef<any>;

  // @ViewChild("vc", { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChildren("container", { read: TemplateRef }) test: QueryList<TemplateRef<any>>;

  constructor() { }

  ngOnInit() {
    // this.dataSource.subscribe(items => {
    //   items.forEach(
    //     element => {
    //       this.renderItem(element);
    //     })
    // });
    console.log(this.test);
  }

  ngAfterViewInit(): void {
    
  }

  private renderItem(item: any): void {
    // var view = this.container.createEmbeddedView(this.template, {$implicit: item});
    // this.container.insert(view);
  }
}
