import { Root } from '../components/Root';
import { Header } from './views/header';
import { Main } from '../components/Main';
import { Footer } from './views/footer';

export class View extends Main {
  public header = new Header();
  private footer = new Footer();

  constructor() {
    super();
    const root = document.getElementById('root') ?? new Root();

    root.append(this.header.node, this.node, this.footer.node);
  }
}
