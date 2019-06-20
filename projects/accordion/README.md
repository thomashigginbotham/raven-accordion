# Raven Accordion

An Angular component for creating simple accordions.

![Screenshot](https://raw.githubusercontent.com/thomashigginbotham/raven-accordion/HEAD/screenshots/sample.png)

## Features

* Option to expand multiple items simultaneously
* Uses HTML `<details>` element for better accessibility
* Customize color, padding, and borders with CSS custom properties

## Installation

Install into your Angular project using NPM.

`npm install raven-accordion --save`

Import the **AccordionModule** into your module.

```ts
import { AccordionModule } from 'raven-accordion';

@NgModule({
  imports: [
    AccordionModule,
    // ...
  ],
  // ...
})
export class AppModule { }
```

## Usage

Add a &lt;raven-accordion&gt; element to your template, and add &lt;raven-accordion-item&gt; elements for each item in the accordion. Then customize each item with a summary and content.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <raven-accordion [allowMultiOpen]="false">
      <raven-accordion-item summary="Heading 1" [open]="true">Item 1</raven-accordion-item>
      <raven-accordion-item summary="Heading 2">Item 2</raven-accordion-item>
      <raven-accordion-item summary="Heading 3">Item 3</raven-accordion-item>
    </raven-accordion>
  `,
  styles: []
})
export class AppComponent { }
```

### Accordion Options

| Option           | Type                  | Description                                                  | Default Value
| :--------------- | :-------------------- | :----------------------------------------------------------- | :------------
| allowMultiOpen   | boolean               | Whether to allow multiple items to be open at the same time. | false
| openItemNotifier | Subject&lt;number&gt; | Should emit an index of an item to open (see FAQ).           | undefined

### Accordion Item Options

| Option         | Type    | Description                                                  | Default Value
| :------------- | :------ | :----------------------------------------------------------- | :------------
| open           | boolean | Whether default state of item is open.                       | false


### Styling

CSS variables are used for styling. Example:

```css
:root {
  --ra-summary-padding: 1.25rem;
  --ra-content-background: #cef;
}
```

#### Available CSS Variables

| Variable                 | Description                     | Default Value
| :----------------------- | :------------------------------ | :-------------
| --ra-summary-padding     | Padding around the summaries.   | .5rem 1rem
| --ra-summary-border      | Border around the summaries.    | 1px solid #ddd
| --ra-summary-font-size   | Font size of the summaries.     | 1.2rem
| --ra-summary-font-weight | Font weight of the summaries.   | 700
| --ra-summary-color       | Text color of the summaries.    | #000
| --ra-summary-background  | Background of the summaries.    | #eee
| --ra-content-padding     | Padding around item content.    | 1rem
| --ra-content-border      | Border around item content.     | 1px solid #ddd
| --ra-content-font-size   | Font size of item content.      | 1rem
| --ra-content-color       | Text color of item content.     | #000
| --ra-content-background  | Background of item content.     | #fff

## FAQ

### How do I open accordion items programmatically?

If you provide a `Subject<number>` to the `openItemNotifier` property of the `RavenAccordion`, you may emit a value that represents the index of the accordion item to open. Here's an example:

**HTML Template**

```html
<raven-accordion [openItemNotifier]="itemOpened">
  <raven-accordion-item summary="Heading 1">Item 1</raven-accordion-item>
  <raven-accordion-item summary="Heading 2">Item 2</raven-accordion-item>
</raven-accordion>

<button type="button" (click)="openItem(0)">Open Item 1</button>
<button type="button" (click)="openItem(1)">Open Item 2</button>
```

**TypeScript**

```ts
export class AppComponent {
  itemOpened: Subject<number> = new Subject();

  openItem(index: number): void {
    this.itemOpened.next(index);
  }
}
```

## Development

To contribute to the development of this component, clone its repository and run `npm install`. Then run `ng serve -o` to start a development server and to open a sample page in your browser.

## License.

MIT license.
