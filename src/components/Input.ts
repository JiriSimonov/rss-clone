import { Component, ComponentProps } from './Component';

export class Input extends Component<HTMLInputElement> {
  constructor(props?: ComponentProps<HTMLInputElement>) {
    super({ ...props, tag: 'input' });
    if (this.node.type === 'number') {
      this.addEventListener('keydown', (e) => {
        if (['e', 'E', '-', '+', '.', ','].includes(e.key)) {
          e.preventDefault();
        }
      });
    }
  }

  public get value(): string {
    return this.node.value;
  }
  public set value(value: string) {
    this.node.value = value;
  }
  public get name(): string {
    return this.node.name;
  }
  public set name(value: string) {
    this.node.name = value;
  }
  public get disabled(): boolean {
    return this.node.disabled;
  }
  public set disabled(value: boolean) {
    this.node.disabled = value;
  }
  public get checked(): boolean {
    return this.node.checked;
  }
  public set checked(value: boolean) {
    this.node.checked = value;
  }
}
