interface IComponent {
  parent?: HTMLElement | Component;
  tag?: keyof HTMLElementTagNameMap;
}
export type ComponentProps<T = HTMLElement> = IComponent & Partial<T>;

export class Component<T extends HTMLElement = HTMLElement> {
  readonly #node: T;
  constructor(props?: ComponentProps<T>) {
    this.#node = document.createElement(props?.tag ?? 'div') as T;
    if (props) {
      Object.assign(this.#node, props);
    }
    if (props?.parent) {
      props.parent.append(this.#node);
    }
  }

  public get node(): T {
    return this.#node;
  }
  public get parent(): HTMLElement | null {
    return this.node.parentElement;
  }

  public destroy(): void {
    this.node.remove();
  }
  public removeChild(child: Node | Component): Node {
    return this.node.removeChild(Component.toNode(child));
  }
  public clear(): void {
    this.node.replaceChildren();
  }

  public get text(): string | null {
    return this.node.textContent;
  }
  public set text(value: string | null) {
    this.node.textContent = value;
  }
  public get innerText(): string {
    return this.node.innerText;
  }
  public set innerText(value: string) {
    this.node.innerText = value;
  }
  public setText(value: string | null): void {
    if (value?.includes('\n')) {
      this.innerText = value;
    } else {
      this.text = value;
    }
  }

  public get style(): CSSStyleDeclaration {
    return this.node.style;
  }

  private static toNode(component: string | Node | Component): Node {
    if (typeof component === 'string') {
      return document.createTextNode(component);
    }
    return component instanceof Component ? component.node : component;
  }
  private insert(target: 'before' | 'prepend' | 'append' | 'after', children: (string | Node | Component)[]): void {
    this.node[target](...children.map(Component.toNode));
  }
  public before(...children: (string | Node | Component)[]): void {
    this.insert('before', children);
  }
  public prepend(...children: (string | Node | Component)[]): void {
    this.insert('prepend', children);
  }
  public append(...children: (string | Node | Component)[]): void {
    this.insert('append', children);
  }
  public after(...children: (string | Node | Component)[]): void {
    this.insert('after', children);
  }

  public get onclick(): typeof this.node.onclick {
    return this.node.onclick;
  }
  public set onclick(value) {
    this.node.onclick = value;
  }

  public get addEventListener(): typeof this.node.addEventListener {
    return this.node.addEventListener.bind(this.node);
  }
  public get classList(): DOMTokenList {
    return this.node.classList;
  }
  public replaceWith(...nodes: (string | Node | Component)[]): void {
    return this.node.replaceWith(...nodes.map(Component.toNode));
  }
}
