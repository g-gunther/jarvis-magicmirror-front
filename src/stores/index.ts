import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import test, { ITestStoreState } from './modules/test.store';
import global, { IGlobalStoreState } from './modules/global.store';
import events, { IEventsStoreState } from './modules/events.store';
import weather, { IWeatherStoreState } from './modules/weather.store';
import timer, { ITimerStoreState } from './modules/timer.store';
import alarm, { IAlarmStoreState } from './modules/alarm.store';

Vue.use(Vuex);

export interface IRootState {
  test: ITestStoreState;
  global: IGlobalStoreState;
  events: IEventsStoreState;
  weather: IWeatherStoreState;
  timer: ITimerStoreState;
  alarm: IAlarmStoreState;
}

const debug = process.env.NODE_ENV !== 'production';

export default new Store<ITestStoreState>({
  modules: {
    test,
    global,
    events,
    weather,
    timer,
    alarm,
  },
});
