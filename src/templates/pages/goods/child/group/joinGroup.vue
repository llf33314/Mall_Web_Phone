<template>
    <div v-if="row != null && row.length > 0">
        
        <div class="goods-join-group" >
            <p class="fs42">以下小伙伴正在发起团购，您可以直接参与</p>
            <div class="goods-join-box" v-for="(data,index) in row" :key="index" @click="toGroupDetail(data.busId,data.groupBuyId,data.id,data.joinUserId)">
                <div class="goods-join-men">
                    <p class="goods-join-top">
                        <span class="fs42 shop-show">{{data.nickname}}</span>
                        <span class="fs42 shop-show">还差{{data.joinNum}}人成团</span>
                    </p>
                    <count-down :type="4" :times="data.joinTime"></count-down>
                <!-- <p class="fs42">剩余{{time.DD}}天 {{time.HH}}时 {{time.mm}}分 {{time.ss}}秒 结束</p> -->
                </div>
                <div class="goods-join-buttom fs42">
                    去参团<i class="icon-ziyuan iconfont"></i>
                </div>
                <div class="goods-join-img">
                    <default-img :background="data.headimgurl"
                        :isHeadPortrait="0">
                    </default-img>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultImg from "components/defaultImg";
import countDown from "../../../home/classify_child/countDown";
export default {
  props: ["row", "imgUrl"],
  components: {
    defaultImg,
    countDown
  },
  watch: {
    row(a, b) {
      //   this.data = a;
      if (this.Interval) clearInterval(this.Interval);
      //   this.setTiming(a.joinTime);
    }
  },
  data() {
    return {
      //   data: "",
      //   Interval: "",
      //   time: {
      //     DD: 0,
      //     HH: 0,
      //     mm: 0,
      //     ss: 0
      //   }
    };
  },
  methods: {
    /**
         * 倒计时
         */
    setTiming(time) {
      //倒计时
      let _this = this;
      let Time = _this.row.joinTime;
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
    },
    toGroupDetail(busId, groupBuyId, joinId, memberId) {
      this.$router.push(
        "/groupbuy/detail/" +
          busId +
          "/" +
          groupBuyId +
          "/" +
          joinId +
          "/" +
          memberId
      );
    }
  },
  mounted() {
    console.log(this.row, "this.row");
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/mixins.less";
@import "../../../../../assets/css/base.less";
@import "../../../../../assets/css/common.less";
.goods-join-group {
  width: 100%;
  padding: 27/@dev-Width *1rem;
  padding-bottom: 1/@dev-Width *1rem;
  background: #fff;
  margin-bottom: 20/@dev-Width *1rem;
  .goods-join-box {
    position: relative;
    width: 95%;
    margin: 60/@dev-Width *1rem auto;
    border: 1px solid #e4393c;
    padding: 10/@dev-Width *1rem;
    height: 120/@dev-Width *1rem;
    .border-radius(50px);
    font-size: 0;
    .clearfix;
    line-height: 1;
  }
  .goods-join-men {
    width: 94%;
    padding: 0 156/@dev-Width *1rem;
    .goods-join-top {
      .shop-box-justify;
      margin-bottom: 15 /@dev-Width *1rem;
      span {
        width: 50%;
        text-align: left;
        overflow: hidden;
      }
    }
  }
  .goods-join-buttom {
    position: absolute;
    width: 18%;
    background: #e4393c;
    color: #fff;
    height: 100%;
    line-height: 120/@dev-Width *1rem;
    top: 0;
    right: 0;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    i {
      .fs42;
    }
  }
  .goods-join-img {
    position: absolute;
    top: -28/@dev-Width *1rem;
    left: -30/@dev-Width *1rem;
    width: 164/@dev-Width *1rem;
    height: 164/@dev-Width *1rem;
    .border-radius(100%);
    overflow: hidden;
  }
}
</style>

