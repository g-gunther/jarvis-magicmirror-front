import { WeatherCodeData } from './weatherCode';

export { weatherCodes, unknownWeatherCode, WeatherCodeData } from './weatherCode';

export interface DatedForecastModel {
  date: number;
  weather: WeatherCodeData;
  highestTemperature: number;
  lowestTemperature: number;
  averageTemperature: number;
  sunriseTime: number;
  sunsetTime: number;
  precipitationProbablity: number;
  windSpeed: number;
}

export interface ForecastModel {
  cityName: string;
  forecasts: DatedForecastModel[];
}
