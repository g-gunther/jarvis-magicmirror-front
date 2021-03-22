import { Module, VuexModule, Action, MutationAction, Mutation } from 'vuex-module-decorators';
import eventApi from './api/event.api';

export interface ITimerStoreState {
    time: Date;
    timerWidgetVisible: boolean;
}

@Module({
    namespaced: true,
})
export default class TimerStore extends VuexModule implements ITimerStoreState {
    public time: Date = new Date();
    public timerWidgetVisible: boolean = false;

    @Mutation
    public hideTimer() {
        this.timerWidgetVisible = false;
    }

    @MutationAction({ mutate: ['time', 'timerWidgetVisible'] })
    public async start(time: Date) {
        return {
            time,
            timerWidgetVisible: true,
        };
    }

    @Action({commit: 'hideTimer'})
    public stop() {
        eventApi.put('TIME_COMMAND', {target: 'TIMER', action: 'STOP'});
    }
}
