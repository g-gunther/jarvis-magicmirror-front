<template>
  <div style="width:250px; height:170px;">
    <transition name="fade">
      <div v-if="smallWidgetVisible">
          <div v-if="dailyForecast == null">
            No weather found
          </div>
          <div v-else @click="toFullWeatherPage()">
            <div>
              <p><span style="font-size:25px;">{{cityName}}</span> le <span style="">{{forecastDate | dateformat}}</span></p>
              <p>{{ $t('weather.' + dailyForecast.weather.label) }}</p>
            </div>
            <div style="display: flex; flex-direction: row;">
              <div>
                <img :src="weatherPicture" style="width:80px;"/>
              </div>
              <div>
                  <span style="font-size:45px;">{{dailyForecast.averageTemperature}}</span>°C
              </div>
              <div style="padding-left:20px;padding-top:15px;">
                  <p>{{dailyForecast.lowestTemperature}}°C</p>
                  <p>{{dailyForecast.highestTemperature}}°C</p>
              </div>
            </div>
            <div>
              <p>Précipitation: {{dailyForecast.precipitationProbablity}}%</p>
              <p>Vent: {{dailyForecast.windSpeed}} km/h</p>
            </div>
          </div>
      </div>
    </transition>
      <div style="text-align:right;" v-if="!smallWidgetVisible && dailyForecast != null" @click="displayFullWidget()">
        <p>{{cityName}}</p>
        <img :src="weatherPicture" style="width:45px;"/>
        <p>{{dailyForecast.averageTemperature}}°C</p>
      </div>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import { DatedForecastModel } from '@/plugins/events/listeners/impl/model/weather';

  const weatherModule = namespace('weather');

  @Component
  export default class WeatherSmallComponent extends Vue {

    @weatherModule.State
    public smallWidgetVisible !: boolean;

    @weatherModule.State
    public cityName !: string;

    @weatherModule.State((state) => {
      if (state.forecasts.length > 0) {
        return state.forecasts[0];
      }
      return null;
    }) public dailyForecast!: DatedForecastModel | null;

    @weatherModule.Action('displaySmallWidget')
    public displayFullWidget ?: () => void;

    get forecastDate() {
      return new Date(this!.dailyForecast!.date);
    }

    /**
     * Return the weather icon depending on the weather code and the current time (day or night)
     */
    get weatherPicture() {
      const now = new Date().getTime();

      if (now >= this.dailyForecast?.sunsetTime! && now <= this.dailyForecast?.sunriseTime!) {
        return require(`../../assets/images/weather/icons/${this.dailyForecast?.weather.code}-day.png`);
      }
      return require(`../../assets/images/weather/icons/${this.dailyForecast?.weather.code}-night.png`);
    }

    public toFullWeatherPage() {
      this.$router.push('weather');
    }
  }
</script>