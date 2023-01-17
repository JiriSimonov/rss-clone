import { Component } from './Component';

export class Root extends Component {
  constructor() {
    super({ parent: document.body, className: 'root', id: 'root' });
  }
}
