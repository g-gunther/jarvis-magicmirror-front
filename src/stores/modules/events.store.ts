import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

export interface IEventsStoreState {
    events: Event[];
}

export interface Event {
    eventName: string;
    data: any;
    date: Date;
}

const maxEvents = 100;

@Module({
    namespaced: true,
})
export default class EventStore extends VuexModule implements IEventsStoreState {
    public events: Event[] = [];

    @Mutation
    public addEventMutation(eventName: string, data: any) {
        this.events.unshift({
            eventName,
            data,
            date: new Date(),
        });

        if (this.events.length > maxEvents) {
            this.events.splice(maxEvents, this.events.length - maxEvents);
        }
    }

    @Action({commit: 'addEventMutation'})
    public addEvent({eventName, data}: {eventName: string, data: any}) {
        return {
            eventName,
            data,
        };
    }
}
