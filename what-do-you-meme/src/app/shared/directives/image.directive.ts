import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective implements OnChanges {
@Input('appImage') image!: string | null;
  constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.image) {
    this.renderer.setStyle(this.element.nativeElement, 'background-image', `url(${this.image})`);
    }
  }
}
