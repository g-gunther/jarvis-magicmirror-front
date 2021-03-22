import { DisplayEventListener } from '../displayEventListener';
import { ForecastModel, DatedForecastModel, WeatherCodeData, weatherCodes, unknownWeatherCode } from './model/weather';
import dateHelper from '../../../../helpers/date.helper' ;

class WeatherListener extends DisplayEventListener {

    constructor() {
        super('weather_small');
    }

    public process(vue: Vue, messageData: any) {
        const forecast: ForecastModel = {
            cityName: messageData.data.cityName,
            forecasts: [],
        };

        if (messageData.data.forecasts.length > 0) {
            messageData.data.forecasts.forEach((f: any) => {
                let weatherCode: WeatherCodeData = unknownWeatherCode;
                if (weatherCodes.has(f.weather)) {
                    weatherCode = weatherCodes.get(f.weather)!;
                }

                const dateForecastData: DatedForecastModel = {
                    date: dateHelper.fromOffsetDate(f.date).getTime(),
                    weather: weatherCode,
                    highestTemperature: f.highestTemperature,
                    lowestTemperature: f.lowestTemperature,
                    averageTemperature: f.averageTemperature,
                    sunriseTime: dateHelper.fromOffsetDateTime(f.sunriseTime).getTime(),
                    sunsetTime: dateHelper.fromOffsetDateTime(f.sunsetTime).getTime(),
                    precipitationProbablity: f.precipitationProbablity,
                    // translate wind speed from m/s to km/h and round it to keep only 2 decimals
                    windSpeed: Math.round(f.windSpeed * 3.6 * 100) / 100,
                };

                forecast.forecasts.push(dateForecastData);
            });
        }

        vue.$store.dispatch('weather/update', forecast);
        vue.$store.dispatch('weather/displaySmallWidget');
        vue.$store.dispatch('global/setActiveMode');
        if (vue.$router.currentRoute.name !== 'home') {
            vue.$router.push('home');
        }
    }
}

export default [
    new WeatherListener(),
];
