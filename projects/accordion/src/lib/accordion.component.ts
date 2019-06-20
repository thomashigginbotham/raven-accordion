import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import { Subject } from 'rxjs';

import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'raven-accordion',
  template: `
    <div class="accordion">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class AccordionComponent implements OnInit, AfterContentInit {
  @Input()
  allowMultiOpen: boolean;

  @Input()
  openItemNotifier: Subject<number>;

  @ContentChildren(AccordionItemComponent)
  items: QueryList<AccordionItemComponent>;

  constructor() {
    this.allowMultiOpen = false;
  }

  ngOnInit() {
    if (this.openItemNotifier) {
      this.openItemNotifier.subscribe(index => this.openItem(index));
    }
  }

  ngAfterContentInit() {
    this.items.forEach((item, index) => {
      // Listen for expand/collapse and close other items
      item.stateChange.subscribe(isOpen => {
        if (isOpen && !this.allowMultiOpen) {
          this.closeItemsExcept(index);
        }
      });
    });
  }

  /**
   * Opens an accordion item.
   * @param index The index of the item to open.
   */
  openItem(index: number): void {
    if (!this.items || !this.items.toArray()[index]) {
      throw(`Item with index ${index} does not exist.`);
    }

    this.items.toArray()[index].open = true;

    if (!this.allowMultiOpen) {
      this.closeItemsExcept(index);
    }
  }

  /**
   * Closes all accordion items except for one.
   * @param index The index of the item to leave open.
   */
  closeItemsExcept(index: number): void {
    if (!this.items || !this.items.length) {
      return;
    }

    this.items.forEach((item, curIndex) => {
      if (curIndex !== index) {
        item.open = false;
      }
    });
  }
}
