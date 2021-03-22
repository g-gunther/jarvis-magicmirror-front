import { DisplayEventListener } from '../displayEventListener';
import dateHelper from '../../../../helpers/date.helper';

class TimerListener extends DisplayEventListener {

    constructor() {
        super('timer');
    }

    public process(vue: Vue, messageData: any) {
        if (messageData.data.status === 'SHOW') {
            const time = dateHelper.fromOffsetDateTime(messageData.data.time.dateTime);
            vue.$store.dispatch('timer/start', time);
          } else {
            vue.$store.dispatch('timer/hide');
          }
    }
}

export default [
    new TimerListener(),
];
