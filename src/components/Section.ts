import { Component, ComponentProps } from './Component';

export class Section extends Component {
  public wrapper = new Component({ parent: this, className: 'wrapper' });
  public container = new Component({ parent: this.wrapper, className: 'container' });

  constructor(props?: ComponentProps) {
    super({ className: 'section', ...props, tag: 'section' });
  }
}
