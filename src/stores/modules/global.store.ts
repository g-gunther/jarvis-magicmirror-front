import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionContext } from 'vuex';
import functionHelper from '@/helpers/function.helper';

export interface IGlobalStoreState {
    activeMode: boolean;
}

const INACTIVE_TIMEOUT = 30000;

const sleepModeOnInactivity = functionHelper.debounce((context: ActionContext<any, any>) => {
  context.commit('updateActiveMode', false);
}, INACTIVE_TIMEOUT);

@Module({
    namespaced: true,
})
export default class GlobalStore extends VuexModule implements IGlobalStoreState {
    public activeMode: boolean = true;

    @Mutation
    public updateActiveMode(activeMode: boolean) {
        this.activeMode = activeMode;
        console.log(this.activeMode);
    }

    @Action({commit: 'updateActiveMode'})
    public setActiveMode() {
        // sleep mode when nothing happens in xx seconds
        // finish alarm component
        sleepModeOnInactivity(this.context);
        return true;
    }

    @Action({commit: 'updateActiveMode'})
    public setSleepMode() {
        return false;
    }
}
