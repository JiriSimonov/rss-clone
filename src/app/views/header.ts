import { ComponentProps } from '../../components/Component';
import { Header as HeaderComponent } from '../../components/Header';

export class Header extends HeaderComponent {
  constructor(props?: ComponentProps) {
    super({ ...props });

    this.container.append('Header');
  }
}
