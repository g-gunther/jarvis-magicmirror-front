import { SSEEventBus } from './sse.eventbus';

export interface SubscribeEvent {
    event: string;
    handler: EventListenerOrEventListenerObject;
}

/**
 * Manage the EventSource, subscription & unsubscription of events
 */
export class SSEConnection {

    public eventBus: SSEEventBus;
    private source: EventSource;
    private url: string;
    private events: string[];
    private subscribedEvents: Map<string, SubscribeEvent>;

    constructor(options: any) {
      options = options || {};
      this.url = options.url || '';

      // list of event names to listen on startup
      this.events = options.events || [];

      this.subscribedEvents = new Map();

      this.eventBus = new SSEEventBus();

      this.source = new EventSource(this.url);
      this.source.onopen = () => this.initListeners();
      this.source.onerror = (err: any) => this.onError(err);
    }

    /**
     * Listener to a new event
     * @param {*} event
     */
    public addEventListener(event: string) {
      if (!this.subscribedEvents.has(event)) {
        const handler = (message: Event) => this.onEventMessage(event, message as MessageEvent);
        this.subscribedEvents.set(event, {
          event,
          handler,
        });

        this.source.addEventListener(event, handler);
      }
    }

    /**
     * Remove an event
     * @param {*} event
     */
    public removeEventListener(event: string) {
      if (this.subscribedEvents.has(event)) {
        this.source.removeEventListener(event, this.subscribedEvents.get(event)!.handler);
        this.subscribedEvents.delete(event);
      }
    }

    public close() {
      this.source.close();
    }

    /**
     * Calls on messages that does not have an event
     * in that case, the event is specified in the data json
     * @param {*} message
     * @param {*} rawEvent
     */
    private onGlobalMessage(message: MessageEvent) {
      const parsedMessage = JSON.parse(message.data);
      this.eventBus.publish(parsedMessage.event, parsedMessage.data);
    }

    /**
     * callback when a message on a given event is received
     * @param {*} event
     * @param {*} message
     */
    private onEventMessage(event: string, message: MessageEvent) {
      this.eventBus.publish(event, JSON.parse(message.data));
    }

    private onError(err: any) {
      console.log(`Error on event source for url: ${this.url}`);
      console.log(err);
    }

    /**
     * Initialize listeners that has been given in constructor options
     */
    private initListeners() {
      // global callback which is called when no event name has been specified on emission
      this.source.onmessage = (message) => this.onGlobalMessage(message);

      // listen for event event names that has been specified on startup
      this.events.forEach((event) => {
        this.addEventListener(event);
      });
    }
  }
