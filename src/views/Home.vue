<template>
  <div>
    <Alarm style="position: absolute; right: 0px; top:80px;" />
    <Timer style="position: absolute; left: 25%; top: calc(50% - 80px);" />
    <WeatherSmall style="position: absolute; left: calc(100% - 270px); top: calc(100% - 200px);" />
  </div>
</template>

<script lang="ts">
  import { Component , Vue} from 'vue-property-decorator';

  import WeatherSmall from './components/WeatherSmall.vue';
  import Timer from './components/Timer.vue';
  import Alarm from './components/Alarm.vue';

  @Component({
    components: {
      WeatherSmall,
      Timer,
      Alarm,
    },
  })
  export default class HomeVue extends Vue {
  }
</script>
