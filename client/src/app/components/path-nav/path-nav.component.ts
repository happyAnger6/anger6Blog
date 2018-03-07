import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Path } from '../../models/path';

@Component({
  selector: 'app-path-nav',
  templateUrl: './path-nav.component.html',
  styleUrls: ['./path-nav.component.css']
})
export class PathNavComponent implements OnInit {

  @Output() evSelectedMenu = new EventEmitter<String>();
  @Input() paths: Path[];

  constructor() { }

  ngOnInit() {
  }

  onSelectMenu(menu) {
    this.evSelectedMenu.emit(menu);
  }

}
