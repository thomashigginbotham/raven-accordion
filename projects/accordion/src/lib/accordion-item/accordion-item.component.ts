import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'raven-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css']
})
export class AccordionItemComponent implements OnInit {
  @Input()
  summary: string;

  @Output()
  stateChange: EventEmitter<boolean>;

  @ViewChild('details', { static: true })
  details: ElementRef;

  private _open: boolean;

  constructor() {
    this._open = false;

    this.summary = '';
    this.stateChange = new EventEmitter();
  }

  get open(): boolean {
    return this._open;
  }

  @Input()
  set open(value: boolean) {
    this._open = value;

    if (value) {
      this.openItem();
    } else {
      this.closeItem();
    }
  }

  ngOnInit() {
    if (this.open) {
      this.openItem();
    }
  }

  /**
   * Event listener for click on summary.
   */
  summaryClick() {
    // Emit state change
    this.stateChange.emit(!this.open);
  }

  /**
   * Opens the accordion item.
   */
  openItem() {
    const detailsEl: HTMLDetailsElement = this.details.nativeElement;

    detailsEl.setAttribute('open', '');
  }

  /**
   * Closes the accordion item.
   */
  closeItem() {
    const detailsEl: HTMLDetailsElement = this.details.nativeElement;

    detailsEl.removeAttribute('open');
  }
}
