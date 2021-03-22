import { EventListener, Message } from './eventListener';

export class DisplayEventListener extends EventListener {

    private screenId: string;

    constructor(screenId: string) {
        super('DISPLAY_EVENT');
        this.screenId = screenId;
    }

    public match(message: Message) {
        return super.match(message) && message.data.screenId === this.screenId;
    }
}
