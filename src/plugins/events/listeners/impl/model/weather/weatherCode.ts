
export interface WeatherCodeData {
    code: number;
    label: string;
}

const weatherCodeDataUnknowPrecipitation: WeatherCodeData = {code: 900, label: 'unknown_precipitation'};

export const weatherCodes = new Map<string, WeatherCodeData>([
    ['THUNDERSTORM_WITH_LIGHT_RAIN', {code: 200, label: 'thunderstorm_with_light_rain'}],
    ['THUNDERSTORM_WITH_RAIN', {code: 201, label: 'thunderstorm_with_rain'}],
    ['THUNDERSTORM_WITH_HEAVY_RAIN', {code: 202, label: 'thunderstorm_with_heavy_rain'}],
    ['THUNDERSTORM_WITH_LIGHT_DRIZZLE', {code: 230, label: 'thunderstorm_with_light_drizzle'}],
    ['THUNDERSTORM_WITH_DRIZZLE', {code: 231, label: 'thunderstorm_with_drizzle'}],
    ['THUNDERSTORM_WITH_HEAVY_DRIZZLE', {code: 232, label: 'thunderstorm_with_heavy_drizzle'}],
    ['THUNDERSTORM_WITH_HAIL', {code: 233, label: 'thunderstorm_with_hail'}],
    ['LIGHT_DRIZZLE', {code: 300, label: 'light_drizzle'}],
    ['DRIZZLE', {code: 301, label: 'drizzle'}],
    ['HEAVY_DRIZZLE', {code: 302, label: 'heavy_drizzle'}],
    ['LIGHT_RAIN', {code: 500, label: 'light_rain'}],
    ['MODERATE_RAIN', {code: 501, label: 'moderate_rain'}],
    ['HEAVY_RAIN', {code: 502, label: 'heavy_rain'}],
    ['FREEZING_RAIN', {code: 511, label: 'freezing_rain'}],
    ['LIGHT_SHOWER_RAIN', {code: 520, label: 'light_shower_rain'}],
    ['SHOWER_RAIN', {code: 521, label: 'shower_rain'}],
    ['HEAVY_SHOWER_RAIN', {code: 522, label: 'heavy_shower_rain'}],
    ['LIGHT_SNOW', {code: 600, label: 'light_snow'}],
    ['SNOW', {code: 601, label: 'snow'}],
    ['HEAVY_SNOW', {code: 602, label: 'heavy_snow'}],
    ['MIX_SNOW_RAIN', {code: 610, label: 'mix_snow_rain'}],
    ['SLEET', {code: 611, label: 'sleet'}],
    ['HEAVY_SLEET', {code: 612, label: 'heavy_sleet'}],
    ['SNOW_SHOWER', {code: 621, label: 'snow_shower'}],
    ['HEAVY_SNOW_SHOWER', {code: 622, label: 'heavy_snow_shower'}],
    ['FLURRIES', {code: 623, label: 'flurries'}],
    ['MIST', {code: 700, label: 'mist'}],
    ['SMOKE', {code: 711, label: 'smoke'}],
    ['HAZE', {code: 721, label: 'haze'}],
    ['SAND_DUST', {code: 731, label: 'sand_dust'}],
    ['FOG', {code: 741, label: 'fog'}],
    ['FREEZING_FOG', {code: 751, label: 'freezing_fog'}],
    ['CLEAR_SKY', {code: 800, label: 'clear_sky'}],
    ['FEW_CLOUDS', {code: 801, label: 'few_clouds'}],
    ['SCATTERED_CLOUDS', {code: 802, label: 'scattered_clouds'}],
    ['BROKEN_CLOUDS', {code: 803, label: 'broken_clouds'}],
    ['OVERCAST_CLOUDS', {code: 804, label: 'overcast_clouds'}],
    ['UNKNOWN_PRECIPITATION', weatherCodeDataUnknowPrecipitation],
]);

export const unknownWeatherCode: WeatherCodeData = weatherCodeDataUnknowPrecipitation;
