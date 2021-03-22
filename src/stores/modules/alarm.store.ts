import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import eventApi from './api/event.api';

export interface IAlarmStoreState {
    time: Date;
    alarmWidgetVisible: boolean;
}

// defines how long the small widget has to be visible on screen
const WIDGET_VISIBLE_TIME = 10000;

@Module({
    namespaced: true,
})
export default class AlarmStore extends VuexModule implements IAlarmStoreState {
    public time: Date = new Date();
    public alarmWidgetVisible: boolean = false;

    @Mutation
    public hideAlarmWidget() {
        this.alarmWidgetVisible = false;
    }

    @Mutation
    public showAlarmWidget() {
        this.alarmWidgetVisible = true;
    }

    @Action({commit: 'hideAlarmWidget'})
    public hide() {
    }

    @MutationAction({ mutate: ['time', 'alarmWidgetVisible'] })
    public async start(time: Date) {
        return {
            time,
            alarmWidgetVisible: true,
        };
    }

    @Action({ commit: 'showAlarmWidget' })
    public show() {
        setTimeout(() => this.context.commit('hideAlarm'), WIDGET_VISIBLE_TIME);
    }

    @Action({ commit: 'hideAlarmWidth' })
    public stop() {
        eventApi.put('TIME_COMMAND', {target: 'ALARM', action: 'STOP'});
    }
}
