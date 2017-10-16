export const sourcecode = `<div class="vd-demo__block vd-demo__block-2">
  <runtime start="2017-10-14 12:00:00"></runtime>
</div>
<div class="vd-demo__block vd-demo__block-2">
  <runtime :start="new Date('2017-10-14 12:00:00')"></runtime>
</div>`

export const sourcecodeA = `<runtime start="2017-10-14 12:00:00" :units="{month: '月', hour: '时', minute: '分'}"></runtime>`

export const sourcecodeB = `<runtime start="2017-10-14 12:00:00">
  <template slot="start">lalala</template>
  <template slot="end">hahaha</template>
  <template slot="time">从2017年10月14日开始</template>
</runtime>`
