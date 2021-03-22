import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Settings from '@/views/Settings.vue';
import Weather from '@/views/Weather.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/about', component: About, name: 'about' },
    { path: '/settings', component: Settings, name: 'settings' },
    { path: '/weather', component: Weather, name: 'weather' },
    { path: '*', component: Home, name: 'home' },
  ],
});
