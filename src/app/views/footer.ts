import { Anchor } from '../../components/Anchor';
import { ComponentProps } from '../../components/Component';
import { Footer as FooterComponent } from '../../components/Footer';

export class Footer extends FooterComponent {
  private github = new Anchor({
    className: 'github',
    ariaLabel: 'github link',
    target: '_blank',
    href: 'http://github.com/EternalRival/',
  });
  private logo = new Anchor({
    className: 'logo',
    ariaLabel: 'logo link',
    target: '_blank',
    href: 'http://github.com/EternalRival/',
  });

  constructor(props?: ComponentProps) {
    super({ ...props });

    this.container.append(this.github, '2023', this.logo);
  }
}
