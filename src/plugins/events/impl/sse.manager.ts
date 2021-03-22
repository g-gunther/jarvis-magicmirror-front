import Vue from 'vue';
import { EventListener } from '../listeners/eventListener';
import { SSEConnection } from './sse.connection';

export interface VueSSEOption {
  url: string;
  events ?: string[];
  listeners ?: EventListener[];
}

export class SSEManager {

  private sseConnection: SSEConnection;
  private listeners: EventListener[];

  constructor(options?: VueSSEOption) {
    this.sseConnection = new SSEConnection({
      url: options!.url || '',
      events: options!.events || [],
    });
    this.listeners = options?.listeners || [];
  }

  public init(vue: Vue) {
    // for every listeners that has been found
    this.listeners.forEach((listener) => {
      // first register the event listener
      this.sseConnection.addEventListener(listener.eventName);

      // then register the handler
      this.sseConnection.eventBus.addEventListener(listener.eventName, (messageData, rawMessage) => {
        if (listener.match(rawMessage)) {
          listener.process(vue, messageData, rawMessage);
        }
      });
    });
  }

  public subscribe(event: string) {
    this.sseConnection.addEventListener(event);
  }

  public unsubscribe(event: string) {
    this.sseConnection.removeEventListener(event);
  }

  public close() {
      this.sseConnection.close();
  }
}
