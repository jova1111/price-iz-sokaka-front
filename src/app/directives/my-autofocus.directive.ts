import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[myAutofocus]'
})
export class MyAutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { };

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

}
