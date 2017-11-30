<template>
    <div v-if="isShow">
      <div class="fs36 classify-time shopGray" v-if="type == 1" >
              距结束<span>{{time.DD}}天</span>
              <em v-text="time.HH"></em> :
              <em v-text="time.mm"></em> :
              <em v-text="time.ss"></em>
      </div>
      <!-- 团购详情页面引用 地址：groupbuy/groupbuydetail.vue -->
        <div class="group-goods-time"  v-if="type == 2">
          <span class="fs36">距离结束</span>
          <span class="fs36">
          <em v-text="time.DD"></em> 天
          <em v-text="time.HH"></em>时
          <em v-text="time.mm"></em>分
          <em v-text="time.ss"></em>秒
          </span>
      </div>
      <!-- 团购详情页面引用 地址：groupbuy/groupbuydetail.vue -->
      <div class="group-time fs40 border" v-if="type == 3">
        剩余  <em v-text="time.DD"></em> 天
          <em v-text="time.HH"></em>时
          <em v-text="time.mm"></em>分
          <em v-text="time.ss"></em>秒
      </div>
      <!-- 商品详情参团引用  地址goods/child/group/joinGroup.vue -->
      <p class="fs42" v-if="type == 4">
        剩余{{time.DD}}天 {{time.HH}}时 {{time.mm}}分 {{time.ss}}秒 结束
      </p>
    </div>
</template>
<script>
export default {
  props: {
    times: {
      type: Number,
      default: 0,
      required: true
    },
    type: {
      type: Number,
      default: 1,
      required: false
    }
  },
  data() {
    return {
      time: {},
      isShow: false,
      Interval: "",
      isShowHtml: true
    };
  },
  watch: {
    times: function(a, b) {
      let _this = this;
      _this.time = "";
      _this.time = a;
      if (_this.Interval) clearInterval(_this.Interval);
      if (a === 0) this.isShow = false;
      _this.setTiming(a);
    }
  },
  mounted() {
    if (typeof this.show != "undefined") {
      this.isShowHtml = this.show;
    }
    this.setTiming(this.times);
  },
  methods: {
    /** 
     * 倒计时
     */
    setTiming(time) {
      //倒计时
      let _this = this;
      let Time = _this.times;
      _this.time = "";
      this.Interval = setInterval(() => {
        //做定时器
        if (Time === 0) {
          //时间结束
          clearInterval(_this.Interval);
          _this.time = _this.timer(0);
        } else {
          // 时间未结束
          Time--;
          _this.time = _this.timer(Time);
          this.isShow = true;
        }
      }, 1000);
    },
    /**
     * 活动时间分隔
     */
    timer(intDiff) {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (intDiff > 0) {
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - day * 24;
        minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
        second =
          Math.floor(intDiff) -
          day * 24 * 60 * 60 -
          hour * 60 * 60 -
          minute * 60;
      } else {
      }

      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;

      var times = {};
      times.DD = day;
      times.HH = hour;
      times.mm = minute;
      times.ss = second;

      return times;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/mixins.less";
@import "../../../../assets/css/base.less";
@import "../../../../assets/css/common.less";

.classify-time {
  margin-top: 10/@dev-Width *1rem;
  span {
    color: #333333;
    margin: 3px;
  }
  em {
    font-size: 32/@dev-Width *1rem;
    display: inline-block;
    background: #ffcc00;
    color: #333333;
    padding: 1px 2px;
    .border-radius(3px);
  }
}
// 团购详情倒计时样式  start
.group-goods-time {
  font-size: 0;
  border: 1px solid #e4393c;
  height: 70/@dev-Width * 1rem;
  .shop-box-justify;
  overflow: hidden;
  margin-top: 15/@dev-Width * 1rem;
  .border-radius(3px);
  span {
    display: block;
    line-height: 70/@dev-Width * 1rem;
    height: 70/@dev-Width * 1rem;
    text-align: center;
  }
  & > span:first-child {
    width: 32%;
    height: 70/@dev-Width * 1rem;
    color: #fff;
    background: #e4393c;
    text-align: center;
  }
  & > span:last-child {
    width: 68%;
    color: #e4393c;
  }
}
.group-time {
  text-align: center;
  height: 200 /@dev-Width * 1rem;
  padding: 62 /@dev-Width * 1rem 0;
  color: #fff;
  background: url("../../../../assets/img/tuangou_bg2.jpg")no-repeat;
  background-size: 100% 100%;
  em {
    background: #cb080b;
    display: inline-block;
    width: 62/@dev-Width * 1rem;
    height: 62/@dev-Width * 1rem;
    text-align: center;
    line-height: 66/@dev-Width * 1rem;
    .border-radius(5px);
  }
}
// 团购详情倒计时样式  end
</style>
