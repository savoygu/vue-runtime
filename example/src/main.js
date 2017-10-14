import Vue from 'vue'
import App from './App.vue'

import Runtime from '../../src/index.js'
Vue.use(Runtime)

import VueDemonstration from 'vue-demonstration'
Vue.component('demonstration', VueDemonstration)

new Vue({
    el: '#app',
    render: h => h(App)
})
