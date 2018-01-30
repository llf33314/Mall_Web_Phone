<template>
    <div class="fs36 countDown-time shopGray">
            <em v-text="time.HH"></em> :
            <em v-text="time.mm"></em> :
            <em v-text="time.ss"></em>
    </div>
</template>
<script>

export default {
    props: {
        times:{
            type: Number,
            default: 0,
            required: true,
        }
    },
    data(){
        return {
           time:{},
           isShow:false
        }
    },
    watch: {
        'times':function(a,b){
            this.time = '';
            this.time = a;
            this.setTiming ();
        }
    },
    mounted() {
        this.setTiming (this.times);
    },
    methods: {
        /**
         * 倒计时
         */
        setTiming (time) {  //倒计时
            let _this = this;
            let Time = _this.times;
            let Interval =  setInterval(() =>{  //做定时器
                if(Time===0){ //时间结束
                    clearInterval(Interval);
                    _this.time = _this.timer(0);
                }else{// 时间未结束
                    Time--;
                    _this.time = _this.timer(Time);
                    this.isShow = true;
                }
            },1000)
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
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            } else {

            }

            if (hour <= 9)   hour = '0' + hour;
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;


            var times = {};
            times.DD = day;
            times.HH = hour;
            times.mm = minute;
            times.ss = second;

            return times;
        }
    }
}
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';

.countDown-time{
    display: inline-block;
    span{
        color: #333333;
        margin: 3px;
    }
    em{
        font-size: 32/@dev-Width *1rem;
        display: inline-block;
        background: #ffcc00;
        color: #333333;
        padding: 1px 2px;
        .border-radius(3px);
    }
}

</style>
