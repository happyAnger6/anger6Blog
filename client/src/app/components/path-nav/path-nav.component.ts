import { Component, OnInit, Input } from '@angular/core';
import { Path } from '../../models/path';

@Component({
  selector: 'app-path-nav',
  templateUrl: './path-nav.component.html',
  styleUrls: ['./path-nav.component.css']
})
export class PathNavComponent implements OnInit {

  @Input() paths: Path[];

  constructor() { }

  ngOnInit() {
  }

}
