<template>
  <div style="height:100%; overflow-y:auto;">
    <table style="width:100%;table-layout:fixed;">
      <thead>
        <tr>
          <th style="width:25%;">Date</th>
          <th style="width:25%;">Event</th>
          <th style="width:50%;">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="events.length == 0">
          <td colspan="3" style="text-align:center; padding-top:20px;">No events</td>
        </tr>
        <tr v-for="event in events">
          <td style="width:25%;">{{event.date | formatDate}}</td>
          <td style="width:25%;">{{ event.eventName }}</td>
          <td style="white-space: nowrap; text-overflow: ellipsis; overflow:hidden; width:50%; cursor:pointer;" v-on:click="displayDataPopup(event)">{{ event.data }}</td>
        </tr>
      </tbody>
    </table>
    <v-dialog
      v-model="popupOpen"
      scrollable>
      <v-card v-if="selectedEvent != null">
        <v-card-title>
          <span style="color:black;">{{selectedEvent.date | formatDate}} - {{ selectedEvent.eventName }}</span>
        </v-card-title>
        <v-card-text>
          {{ selectedEvent.data }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="popupOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { namespace } from 'vuex-class';
  import { Event } from '@/stores/modules/events.store';

  const eventsModule = namespace('events');

  @Component
  export default class SettingsVue extends Vue {
    @eventsModule.State('events')
    public events!: Event[];

    public selectedEvent: Event | null = null;
    public popupOpen: boolean = false;

    public displayDataPopup(event: Event) {
      this.selectedEvent = event;
      this.popupOpen = true;
    }
  }
</script>
