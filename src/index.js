import Runtime from './components/runtime.vue'

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.component('runtime', Runtime)
}

if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('runtime', Runtime)
}

export default {
  install,
  Runtime
}
