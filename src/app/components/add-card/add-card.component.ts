import { Component, OnInit } from '@angular/core';
import { ModeToggleService} from '../../services/mode-toggle.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.less']
})
export class AddCardComponent implements OnInit {

  public ThemeFlag:boolean = false; // false是关闭状态

  constructor(public modeToggle: ModeToggleService) { }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.ThemeFlag = this.modeToggle.flag
  }



}
