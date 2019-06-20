import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemOpened: Subject<number> = new Subject();

  openItem(index: number): void {
    this.itemOpened.next(index);
  }
}
