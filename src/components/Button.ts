import { Component, ComponentProps } from './Component';

export class Button extends Component<HTMLButtonElement> {
  constructor(props?: ComponentProps<HTMLButtonElement>) {
    super({ ...props, tag: 'button' });
  }

  public get disabled(): boolean {
    return this.node.disabled;
  }
  public set disabled(value: boolean) {
    this.node.disabled = value;
  }
  public click(): () => void {
    return this.node.click.bind(this.node);
  }
}
