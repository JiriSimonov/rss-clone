import { Component, ComponentProps } from "./Component";

export class Anchor extends Component<HTMLAnchorElement> {
  constructor(props?: Omit<ComponentProps<HTMLAnchorElement>, 'toString'>) {
    super({ ...props, tag: 'a' });
  }
}
