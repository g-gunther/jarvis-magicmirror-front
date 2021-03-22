import Vue from 'vue';

import { dateformat, datetimeformat, timeformat } from './dateformat';

Vue.filter('dateformat', dateformat);
Vue.filter('datetimeformat', datetimeformat);
Vue.filter('timeformat', timeformat);
