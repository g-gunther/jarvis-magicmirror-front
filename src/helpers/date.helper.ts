export interface DateTimeDate {
    year: number;
    month: number;
    day: number;
}

export interface DateTimeTime {
    hour: number;
    minute: number;
    second: number;
}

export interface DateTime {
    date: DateTimeDate;
    time: DateTimeTime;
}

export default {
    fromOffsetDateTime(dateTime: DateTime) {
        return new Date(dateTime.date.year,
            dateTime.date.month - 1,
            dateTime.date.day,
            dateTime.time.hour,
            dateTime.time.minute,
            dateTime.time.second);
    },

    fromOffsetDate(date: DateTimeDate) {
        return new Date(date.year,
            date.month - 1,
            date.day);
    },
};
