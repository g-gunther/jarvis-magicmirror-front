import { EventListener } from './eventListener';
import timerListeners from './impl/timer.listener';
import alarmListeners from './impl/alarm.listener';
import weatherListeners from './impl/weather.listener';
import displayListeners from './impl/display.listener';
import logListeners from './impl/log.listener';

const listeners = new Array<EventListener>(
    ...timerListeners,
    ...alarmListeners,
    ...weatherListeners,
    ...displayListeners,
    ...logListeners,
);

export default listeners;
