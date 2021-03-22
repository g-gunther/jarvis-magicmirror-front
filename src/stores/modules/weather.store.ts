import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ForecastModel, DatedForecastModel } from '@/plugins/events/listeners/impl/model/weather';

export interface IWeatherStoreState {
  cityName: string;
  forecasts: DatedForecastModel[];
  smallWidgetVisible: boolean;
}

// defines how long the small widget has to be visible on screen
const SMALL_WIDGET_VISIBLE_TIME = 10000;

@Module({
  namespaced: true,
})
export default class WeatherStore extends VuexModule implements IWeatherStoreState {
  public cityName: string = '';
  public forecasts: DatedForecastModel[] = [];
  public smallWidgetVisible: boolean = false;

    /**
     * update the weather forecast
     * @param {*} state
     * @param {*} data
     */
    @Mutation
    public updateForecasts(forecast: ForecastModel) {
      this.cityName = forecast.cityName;
      this.forecasts = [];

      if (forecast.forecasts.length > 0) {
        forecast.forecasts.forEach((f) => {
          this.forecasts.push(f);
        });
      }
    }

    @Mutation
    public updateSmallWidgetVisibility(visible: boolean) {
      this.smallWidgetVisible = visible;
    }

    @Action({commit: 'updateForecasts'})
    public update(forecast: ForecastModel) {
      return forecast;
    }

    @Action({commit: 'updateSmallWidgetVisibility'})
    public displaySmallWidget() {
        setTimeout(() => this.context.commit('updateSmallWidgetVisibility', false), SMALL_WIDGET_VISIBLE_TIME);
        return true;
    }
}
