# vue-runtime

> Past and present you deserve it(过去和现在你值得拥有))

[DEMO](https://savoygu.github.io/vue-runtime)

## Usage

```vue
import Runtime from 'vue-runtime/src/components/runtime.vue'
Vue.component('runtime', Runtime)


```

OR

```vue
import Runtime from 'vue-runtime/src/index.js'
Vue.use(Runtime)

<runtime start="2012-10-25 00:00:00"></runtime>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run demo:dev

# build for demo with minification
npm run demo:build

# build for gh-pages with minification
npm run demo:prepublish

# build for production with minification
npm run build
```
