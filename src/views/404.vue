<template>
  <main-layout>
    <p>Page not found</p>
  </main-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  import MainLayout from '../layouts/Main.vue';

  @Component({
    components: {
      MainLayout,
    },
  })
  export default class NotFoundVue extends Vue {
  }
</script>
