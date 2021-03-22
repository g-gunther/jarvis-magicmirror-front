import moment from 'moment';

export function dateformat(value: Date) {
    if (value) {
        return moment(value).format('DD/MM/YYYY');
    }
}

export function datetimeformat(value: Date) {
        if (value) {
            return moment(value).format('DD/MM/YYYY HH:mm');
        }
}

export function timeformat(value: Date) {
    if (value) {
        return moment(value).format('HH:mm:ss');
    }
}
