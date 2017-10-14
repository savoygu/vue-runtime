<template>
  <div id="app">
    <demonstration
        tag="h2"
        title="runtime 组件"
        description="用来统计从某一时刻到未来的运行时间"
        :show-content="false">
    </demonstration>
    <demonstration
        title="基本实例"
        anchor="demo-code-title"
        :highlight="sourcecode"
        multiple>
      <template slot="description">
      </template>
      <template slot="source">
        <div class="source">
          <div class="vd-demo__block vd-demo__block-2">
            <runtime start="2012-10-25 00:00"></runtime>
          </div>
          <div class="vd-demo__block vd-demo__block-2">
            <runtime :start="new Date('2012-10-25 00:00')"></runtime>
          </div>
        </div>
      </template>
      <template slot="explanation">
        你需要提供一个 `start` 属性，它可以是一个字符串或者一个 `Date` 对象。
      </template>
    </demonstration>
    <demonstration
        title="时间单位"
        anchor="demo-code-title"
        :highlight="sourcecodeA">
      <template slot="description">
      </template>
      <template slot="source">
        <div class="source">
          <runtime start="2012-10-25 00:00" :units="{month: '月', hour: '时', minute: '分'}"></runtime>
        </div>
      </template>
      <template slot="explanation">
        你需要提供一个 `units` 属性，它是一个对象对象，可以指定 `year`、`month`、`day`、`hour`、`minute`、`second` 属性修改对应的单位。
      </template>
    </demonstration>
    <demonstration
        title="文字描述"
        anchor="demo-code-title"
        :highlight="sourcecodeB">
      <template slot="description">
      </template>
      <template slot="source">
        <div class="source">
          <runtime start="2012-10-25 00:00">
            <template slot="start">lalala</template>
            <template slot="end">hahaha</template>
            <template slot="time">从2012年10月25日开始</template>
          </runtime>
        </div>
      </template>
      <template slot="explanation">
        可以通过指定`slot="start"`或者属性`start-text` 修改开始文字，`slot="end"`或者属性 `end-text`修改结束文字，及 `slot="time"` 修改时间描述。
      </template>
    </demonstration>
    <demonstration
        anchor="attributes"
        title="Attributes"
        :show-content="false">
      <template slot="table">
        <table class="vd-demo__table">
          <thead>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
          </thead>
          <tbody>
          <tr>
            <td>start （必填）</td>
            <td>指定开始时间</td>
            <td>string/date</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>start-text</td>
            <td>开始文字</td>
            <td>string</td>
            <td>—</td>
            <td>累计运行</td>
          </tr>
          <tr>
            <td>end-text</td>
            <td>结束文字</td>
            <td>string</td>
            <td>—</td>
            <td>到现在</td>
          </tr>
          <tr>
            <td>units</td>
            <td>时间单位</td>
            <td>object</td>
            <td>—</td>
            <td>{year: '年', month: '个月', day: '天', hour: '小时', minute: '分钟', second: '秒'}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </demonstration>
    <demonstration
        anchor="slots"
        title="Slots"
        :show-content="false">
      <template slot="table">
        <table class="vd-demo__table">
          <thead>
          <th>参数</th>
          <th>说明</th>
          </thead>
          <tbody>
          <tr>
            <td>start</td>
            <td>开始文字</td>
          </tr>
          <tr>
            <td>end</td>
            <td>结束文字</td>
          </tr>
          <tr>
            <td>time</td>
            <td>时间描述</td>
          </tr>
          </tbody>
        </table>
      </template>
    </demonstration>
  </div>
</template>

<script type="es6">
  import {sourcecode, sourcecodeA, sourcecodeB} from './template'

  export default {
    data () {
      return {
        msg: '编写你的代码',
        sourcecode,
        sourcecodeA,
        sourcecodeB
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less">
  #app {
    margin: 60px auto;
    .vd-demo__block {
      text-align: left;
    }
  }
</style>
