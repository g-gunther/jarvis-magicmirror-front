import Vue from 'vue';

export interface Message {
    event: string;
    data: any;
}

export class EventListener {

    public eventName: string;

    constructor(eventName: string) {
        this.eventName = eventName;
    }

    public match(message: Message) {
        return message.event === this.eventName;
    }

    public process(vue: Vue, messageData: any, rawMessage: Message) {
        console.log(`Listener for event ${this.eventName} has no process methods for data ${messageData}`);
    }
}
