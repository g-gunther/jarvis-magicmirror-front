<template>
  <div class="header" v-bind:style="{opacity: activeMode ? 1 : 0.3}">
    <div class="time">
      <span v-if="activeMode">{{now | datetimeformat}}</span>
    </div>
    <div style="display: flex; flex-direction: row;" @click="alarm()" v-if="alarmWidgetVisible">
      <div class="icon icon-alarm"></div>
      <span style="padding-top:3px;">{{time | timeDate}}</span>
    </div>
    <div class="status-icons-container">
      <button class="icon-settings icon" @click="settings()" v-if="$route.path != '/settings' && activeMode"/>
      <button class="icon-home icon" @click="home()" v-if="$route.path != '/home' && $route.path != '/' && activeMode"/>
      
      <!-- Stop the propagation of the event in order to not activate the event listener on the entire document to set activeMode. See Main.vue layout-->
      <button class="icon-off icon" @click.stop="setSleepMode()" v-if="activeMode" />
      <button class="icon-on icon" @click="setActiveMode()" v-else/>

      <button class="icon-power icon" @click="power()"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';

  const globalModule = namespace('global');
  const alarmModule = namespace('alarm');

  @Component
  export default class HeaderVue extends Vue {
    @globalModule.State
    public activeMode!: boolean;

    @globalModule.Action
    public setActiveMode!: () => void;

    @globalModule.Action
    public setSleepMode !: () => void;

    @alarmModule.State
    public time!: Date | null;

    @alarmModule.State
    public alarmWidgetVisible!: boolean;

    @alarmModule.Action
    public show !: () => void;

    public now: number = Date.now();

    private interval ?: number;

    public power() {
      // console.log('power');
    }

    public settings() {
      this.$router.push('settings');
    }

    public home() {
      this.$router.push('home');
    }

    private updateDateTime() {
      this.now = Date.now();
    }

    private mounted() {
      this.interval = setInterval(this.updateDateTime, 10000);
    }

    private beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>

<style scoped>
  .header {
      width:100%;
      height:40px;
      padding-top:5px;
      display: flex; 
      flex-direction: row;
      justify-content:space-between;
  }
  .time {
    margin-left:10px;
    margin-top:5px;
  }
  .status-icons-container {
    display: flex; 
    flex-direction: row;
  }
  .icon {
    width:32px;
    height:32px;
    border:none;
    outline:none;
    margin-right:5px;
    background-repeat: no-repeat;
  }
  .icon-on {
    background-image:url('../../../assets/images/sun.png');
    background-size: 32px 32px;
  }
  .icon-off {
    background-image:url('../../../assets/images/moon.png');
    background-size: 32px 32px;
  }
  .icon-power {
    background-image:url('../../../assets/images/power.png');
    background-size: 32px 32px;
  }
  .icon-settings {
    background-image:url('../../../assets/images/settings.png');
    background-size: 32px 32px;
  }
  .icon-home {
    background-image:url('../../../assets/images/home.png');
    background-size: 32px 32px;
  }
  .icon-alarm {
    background-image:url('../../../assets/images/alarm.png');
    background-size: 24px 24px;
    width:24px;
    height:24px;
  }
</style>
