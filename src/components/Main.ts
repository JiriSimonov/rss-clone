import { Component, ComponentProps } from './Component';

export class Main extends Component {
  constructor(props?: ComponentProps) {
    super({ className: 'main', ...props, tag: 'main' });
  }
}
