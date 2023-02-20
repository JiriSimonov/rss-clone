import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAvatar]'
})
export class AvatarDirective implements OnChanges {
@Input('appAvatar') image!: string | null;
  constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.image) {
    this.renderer.setStyle(this.element.nativeElement, 'background-image', `url(${this.image})`);
    }
  }
}
