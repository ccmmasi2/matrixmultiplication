import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumericInput]'
})
export class NumericInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const sanitizedValue = value.replace(/[^1-5]/g, '');
    input.value = sanitizedValue.charAt(0);
  }
}
