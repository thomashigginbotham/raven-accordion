import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@NgModule({
  declarations: [AccordionComponent, AccordionItemComponent],
  imports: [
  ],
  exports: [AccordionComponent, AccordionItemComponent]
})
export class AccordionModule { }
