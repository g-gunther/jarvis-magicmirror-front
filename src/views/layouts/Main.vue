<template>
  <v-app class="main-container">
    <Header></Header>
    <transition name="fade">
      <div class="content" v-if="activeMode">
          <router-view ></router-view>
      </div>
    </transition>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  import Header from './components/Header.vue';

  const globalModule = namespace('global');

  @Component({
    components: {
      Header,
    },
  })
  export default class MainVue extends Vue {
    @globalModule.State
    public activeMode!: boolean;

    @Watch('activeMode')
    private onActiveModeChanged(value: boolean, oldValue: boolean) {
      if (this.$router.currentRoute.name !== 'home') {
        this.$router.push('home');
      }
    }

   private mounted() {
      // when a click occurs, set the active mode
      document.addEventListener('click', (e: Event) => {
        this.$store.dispatch('global/setActiveMode');
      });
    }
  }
</script>

<style scoped>
  .main-container {
    width: 100%;
    margin:0;
    height:100%;
    background:black!important;
  }
  .content {
    padding: 15px;
    height:calc(100% - 80px);
  }
</style>
