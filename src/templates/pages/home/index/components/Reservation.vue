<template>
    <div>
      <div v-if="picJson.imgID.length>0">
        <div v-for="res in picJson.imgID">
          <div class="reservation">
            <div class="reservation_m">
              <div class="res-photo"><a :href="res.url"><img class="img_class" :src="res.proImgUrl"></a></div>
              <div class="res-m">
                <a :href="res.url"><div class="res-title">{{res.proName}}</div></a>
                <div class="h1"></div>
                <div class="res-m1">{{res.product_introdu}}</div>
                <div class="h1"></div>
                <div class="res-m2">{{res.name}}</div>
                <div class="h1"></div>
                <div class="res-money">
                  <span class="r-money">￥<font>{{res.proPrice}}</font></span>
                  <div class="res-btn">
                    <a :href="res.url"><button>点我预订<img src="../../../../../assets/images/icon_02.png" class="w1"></button></a>
                    <div class="h1"></div>
                    <div class="res-p">已有<span>{{res.orderNum}}</span>人预定</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reservation_b" :class='{"end-a":res.status==-1}'>
              <span class="icon_time" v-if="res.status == 0"><img src="../../../../../assets/images/icon_01.png">距离开始</span>
              <span class="icon_time" v-if="res.status == 1"><img src="../../../../../assets/images/icon_01.png">距离结束</span>
              <span class="icon_time" v-if="res.status == -1"><img src="../../../../../assets/images/icon_01.png">活动结束</span>
              <div class="time-d" v-count-down :datatime="res.times"><span class="day">00</span>天<span class="hours">00</span>时<span class="minutes">00</span>分<span class="seconds">00</span>秒</div>
            </div>
            <div class="clock" @click="message(res.preId)" v-if="res.status == 0"><img src="../../../../../assets/images/clock_btn.png" width="100%"></div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>

	// import Lib from '@/assets/js/Lib';

	export default {
    name: 'Reservation',
		data() {
			return {}
		},
    props:{
      data:{
        type: [Object,Array]
      },
      _page:{
        type: Number
      },
      picJson:{
        type: [Object,Array]
      }
    },
		components: {},
		//实例初始化最之前，无法获取到data里的数据
		beforeCreate() {


		},
		//在挂载开始之前被调用
		beforeMount() {


		},
		//已成功挂载，相当ready()
		mounted() {


		},
		//相关操作事件
		methods: {
      message(){

      }
    }
	}

</script>
