import { Component, ComponentProps } from './Component';

export class Footer extends Component {
  public wrapper = new Component({ parent: this, className: 'wrapper' });
  public container = new Component({ parent: this.wrapper, className: 'container' });

  constructor(props?: ComponentProps) {
    super({ className: 'footer', ...props, tag: 'footer' });
  }
}
