import { EventListener, Message } from '../eventListener';

class LogListener extends EventListener {

    constructor() {
        super('LOG');
    }

    public process(vue: Vue, messageData: any, rawMessage: Message) {
        vue.$store.dispatch('events/addEvent', {
            eventName: rawMessage.event,
            data: messageData,
          });
    }
}


export default [
    new LogListener(),
];
