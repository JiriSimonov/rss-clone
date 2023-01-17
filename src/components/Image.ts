import { Component, ComponentProps } from './Component';

export class Image extends Component<HTMLImageElement> {
  constructor(props?: ComponentProps<HTMLImageElement>) {
    super({ ...props, tag: 'img' });
  }

  public get src(): string {
    return this.node.src;
  }
  public set src(value: string) {
    this.node.src = value;
  }

  public get decode(): () => Promise<void> {
    return this.node.decode.bind(this.node);
  }
}
