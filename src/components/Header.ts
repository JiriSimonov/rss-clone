import { Component, ComponentProps } from './Component';

export class Header extends Component {
  public wrapper = new Component({ parent: this, className: 'wrapper' });
  public container = new Component({ parent: this.wrapper, className: 'container' });

  constructor(props?: ComponentProps) {
    super({ className: 'header', ...props, tag: 'header' });
  }
}
