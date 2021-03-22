<template>
  <div>
    <h1>{{cityName}}</h1>

    <div style="width:calc(100% - 10px); overflow-x:auto;">
      <div style="display: flex; flex-direction: row;">
        <div v-for="forecast in forecasts" style="margin-right:50px;">
          <div style="text-align:center;">{{forecast.date | dateformat}}</div>
          <div style="display: flex; flex-direction: row;">
            <div>
              <img :src="weatherPicture(forecast)" style="width:40px;"/>
            </div>
            <div>
                <span style="font-size:20px;">{{forecast.averageTemperature}}</span>°C
            </div>
            <div style="padding-left:10px;">
                <p>{{forecast.lowestTemperature}}°C</p>
                <p>{{forecast.highestTemperature}}°C</p>
            </div>
          </div>
          <div>
            <p>Précipitation: {{forecast.precipitationProbablity}}%</p>
            <p>Vent: {{forecast.windSpeed}} km/h</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import { DatedForecastModel } from '../plugins/events/listeners/impl/model/weather';

  const weatherModule = namespace('weather');

  @Component
  export default class WeatherVue extends Vue {
    @weatherModule.State('cityName') public cityName!: string | null;
    @weatherModule.State('forecasts') public forecasts!: DatedForecastModel[];

    public weatherPicture(forecast: DatedForecastModel) {
      const now = new Date().getTime();

      if (now >= forecast.sunsetTime && now <= forecast.sunriseTime) {
        return require(`../assets/images/weather/icons/${forecast.weather.code}-day.png`);
      }
      return require(`../assets/images/weather/icons/${forecast.weather.code}-night.png`);
    }
  }
</script>
