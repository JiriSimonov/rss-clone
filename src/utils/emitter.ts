export enum EventName {
  'event1' = 'event-name-1',
  'event2' = 'event-name-2',
}

class Emitter<EventCallback extends Callback<EventCallback>> {
  private events: Map<EventName, EventCallback[]> = new Map();

  public subscribe(eventName: EventName, callback: EventCallback): void {
    const eventList = this.events.get(eventName);
    if (eventList) {
      eventList.push(callback);
    } else {
      this.events.set(eventName, [callback]);
    }
  }

  public unsubscribe(eventName: EventName, callback: EventCallback): void {
    const eventList = this.events.get(eventName);
    if (!eventList) {
      return;
    }

    const filteredList = eventList.filter((listener) => listener !== callback);
    this.events.set(eventName, filteredList);
  }

  public emit(eventName: EventName, ...args: unknown[]): void {
    this.events.get(eventName)?.forEach((listener) => listener(...(args as Parameters<EventCallback>)));
  }
}

export const emitter = new Emitter();
