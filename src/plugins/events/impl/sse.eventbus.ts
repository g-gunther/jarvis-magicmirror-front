import { Message } from '../listeners/eventListener';

export interface SubscribeEventList {
    event: string;
    handlers: EventHandler[];
}

export type EventHandler = (messageData: any, rawData: Message) => void;

/**
 * Simple event bus to emit sse events internally
 */
export class SSEEventBus {

    private subscribedEvents: Map<string, SubscribeEventList>;

    constructor() {
      this.subscribedEvents = new Map();
    }

    /**
     * Publish some data for a given event name
     * @param {} eventName
     * @param {*} data
     */
    public publish(eventName: string, message: Message) {
      if (!this.subscribedEvents.has(eventName)) {
        return;
      }

      this.subscribedEvents.get(eventName)!.handlers.forEach((handler) => {
        handler(message.data, message);
      });
    }

    /**
     * Add an event listener
     * @param {*} event
     * @param {*} handler
     */
    public addEventListener(event: string, handler: EventHandler) {
      if (!this.subscribedEvents.has(event)) {
        this.subscribedEvents.set(event, {
          event,
          handlers: [],
        });
      }
      this.subscribedEvents.get(event)!.handlers.push(handler);
    }

    /**
     * Remove an event listener
     * @param {*} event
     * @param {*} handler
     */
    public removeEventListener(event: string, handler: EventHandler) {
      if (!this.subscribedEvents.has(event)) {
        return;
      }

      const index = this.subscribedEvents.get(event)!.handlers.indexOf(handler);
      if (index > -1) {
        this.subscribedEvents.get(event)!.handlers.splice(index, 1);
      }

      if (this.subscribedEvents.get(event)!.handlers.length === 0) {
        this.subscribedEvents.delete(event);
      }
    }
  }
