import VueI18n from 'vue-i18n';
import Vue from 'vue';
import weather from './modules/weather';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages: {
    fr: {
      weather,
    },
  },
});

export default i18n;
