<template>
  <div class="rt-runtime">
    <div class="rt-runtime__time-group">
      <span class="rt-runtime__past"><slot name="start">{{startText}}</slot></span>
      <span class="rt-runtime__time" v-for="time in rt">
        <i class="rt-runtime__figure"
           :style="{'background-position': `0 -${time.figure * 44}px`}"></i>
        <small class="rt-runtime__unit">{{time.unit}}</small>
      </span>
      <span class="rt-runtime__now"><slot name="end">{{endText}}</slot></span>
    </div>
    <p class="rt-runtime__description">
      <slot name="time">{{startTime}}</slot>
    </p>
  </div>
</template>
<script>

  const UNIT_MAP = {
    year: '年',
    month: '个月',
    day: '天',
    hour: '小时',
    minute: '分钟',
    second: '秒'
  }

  const TIMES = ['year', 'month', 'day', 'hour', 'minute', 'second']

  /**
   * 深拷贝
   * @param source
   * @returns {*}
   */
  function deepClone (source) {
    /**
     * 浅克隆
     */
    if (!source || typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
      if (source.hasOwnProperty(keys)) { // 自身属性
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepClone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
  }

  export default {
    name: 'Runtime',

    props: {
      start: {
        type: [String, Date],
        required: true
      },
      startText: {
        type: String,
        default: '累计运行'
      },
      endText: {
        type: String,
        default: '到现在'
      },
      units: {
        type: Object,
        default () {
          return UNIT_MAP
        }
      }
    },

    data () {
      return {
        rt: [],
        timer: null,
        unitsMap: {}
      }
    },

    computed: {
      startTime () {
        let time = this.toObject(this.start)
        console.log(time)
        let padStart = this.padStart
        return `从${time.years}年${time.months + 1}月${time.date}日${padStart(time.hours)}:${padStart(time.minutes)}:${padStart(time.seconds)}开始`
      }
    },

    methods: {
      /**
       * 补零
       * @param time
       * @returns {string}
       */
      padStart (time) {
        if (String.prototype.padStart) {
          return  String(time).padStart(2, '0')
        }
        return ('0' + time).slice(-2)
      },
      /**
       * 获取一个月的最后一天（一个月有多少天）
       * @param year
       * @param month
       * @returns {number}
       */
      daysInMonth (year, month) {
        return new Date(year, month, 0).getDate()
      },
      /**
       * 日期转换为对象
       * @param date
       * @returns {{years: number, months: number, date: number, hours: number, minutes: number, seconds: number}}
       */
      toObject (date) {
        if (typeof date === 'string') {
          date = new Date(date)
        }
        return {
          years: date.getFullYear(),
          months: date.getMonth(),
          date: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        }
      },
      handleTransboundary (times, conversion) {
        conversion.forEach((item, index) => {
          if (times[index] >= item) {
            times[index] -= item
            times[index + 1]++
          }
        })
        return times
      },
      /**
       * 开始时间与现在的时间差
       * @returns {{year: number, month: number, day: number, hour: number, minute: number, second: number}}
       */
      diff () {
        const oLast = this.toObject(this.start)
        const oToday = this.toObject(new Date())
        const lastDaysInMonth = this.daysInMonth(oLast.years, oLast.months + 1)

        let year = oToday.years - (oLast.years + 1)
        let month = 12 - (oLast.months + 1) + oToday.months
        let day = lastDaysInMonth - (oLast.date + 1) + oToday.date
        let hour = 24 - (oLast.hours + 1) + oToday.hours
        let minute = 60 - (oLast.minutes + 1) + oToday.minutes
        let second = 60 - oLast.seconds + oToday.seconds

        /**
         * 处理越界的情况
         *
         * if (seconds >= 60) {
         *    seconds -= 60
         *    minutes++
         * }
         * if (minutes >= 60) {
         *    minutes -= 60
         *    hours++
         * }
         * if (hours >= 24) {
         *    hours -= 24
         *    days++
         * }
         * if (days >= lastDaysInMonth) {
         *    days -= lastDaysInMonth
         *    months++
         * }
         * if (months >= 12) {
         *    months -= 12
         *    years++
         * }
         * @type {[*]}
         */
        const times = [second, minute, hour, day, month, year]
        const conversion = [60, 60, 24, lastDaysInMonth, 12] // 换算单位 秒，分，时，天，月
        ;[second, minute, hour, day, month, year] = this.handleTransboundary(times, conversion)

        return {year, month, day, hour, minute, second}
      },
      runtime () {
        this.rt = []
        const o = this.diff()
        TIMES.forEach(time => {
          this.rt.push({
            figure: o[time],
            unit: this.unitsMap[time]
          })

        })
      }
    },
    mounted () {
      this.runtime()
      this.timer = setInterval(_ => {
        this.runtime()
      }, 1000)
    },
    destroyed () {
      clearInterval(this.timer)
    },
    created () {
      this.unitsMap = Object.assign(deepClone(UNIT_MAP), this.units)
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .rt-runtime {
    color: #525251;
    &__time-group {
      position: relative;
      left: 50%;
      display: inline-block;
      font-size: 0;
      transform: translateX(-50%);
    }
    &__past,
    &__now {
      position: absolute;
      width: 7.5rem;
      top: 50%;
      padding-top: .3125rem;
      font-size: .875rem;
      text-align: center;
      border-top: 1px solid #525521;
    }
    &__past {
      left: -8.75rem;
    }
    &__now {
      right: -8.75rem;
    }
    &__time {
      position: relative;
      display: inline-block;
      width: 2.5rem;
      height: 2.75rem;
      margin: 0 .3125rem;
      background-color: #525251;
      border-radius: 4px;
      &:after {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 50%;
        background-color: hsla(0, 0%, 100%, .15);
        border-bottom: 1px solid #383838;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
    &__figure {
      position: absolute;
      left: .3125rem;
      top: 0;
      z-index: 1;
      width: 1.875rem;
      height: 100%;
      text-indent: -9999rem;
      background: url("../assets/times.png") 0 0 no-repeat;
      transition: background-position 1s ease-in-out;
      overflow: hidden;
    }
    &__unit {
      position: absolute;
      width: 100%;
      top: 100%;
      left: 0;
      padding-top: .3125rem;
      font-size: .75rem;
      text-align: center;
    }
    &__description {
      margin-top: 2rem;
      margin-bottom: 0;
      font-size: .875rem;
      text-align: center;
    }
  }
</style>
