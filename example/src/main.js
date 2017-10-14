import Vue from 'vue'
import App from './App.vue'

import Runtime from '../../src/index.js'
// import Runtime from '../../lib/progress.js'
// Vue.component(Runtime.name, Runtime)
Vue.use(Runtime)

import VueDemonstration from 'vue-demonstration'
Vue.component('demonstration', VueDemonstration)

new Vue({
    el: '#app',
    render: h => h(App)
})
