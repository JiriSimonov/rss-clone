import { Model } from './model';
import { View } from './view';

export class App {
  private model = new Model();
  private view = new View();

  public run(): void {
    console.info('App started!');
  }
}
