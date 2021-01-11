import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bb-example-widget',
  template: `
    <p>
      example-widget works!
    </p>
  `,
  styles: []
})
export class ExampleWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
