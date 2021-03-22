import { EventListener, Message } from '../eventListener';

class DisplayListener extends EventListener {

    constructor() {
        super('DISPLAY_EVENT');
    }

    public process(vue: Vue, messageData: any, rawMessage: Message) {
        // log the event
        vue.$store.dispatch('events/addEvent', {
            eventName: rawMessage.event,
            data: messageData,
        });

        // active the screen
        vue.$store.dispatch('global/setActiveMode');
    }
}

export default [
    new DisplayListener(),
];
