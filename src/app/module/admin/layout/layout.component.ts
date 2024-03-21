import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <app-sidebar></app-sidebar>
  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
