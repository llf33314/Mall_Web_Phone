<template>
    <div>
      <div class="swiper" v-swiper-draggable>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-box" v-for="(pic,index) in data.pic">
              <div class="swiper-title">{{pic.title}}</div>
              <a :href="picJson.imgID[index].url">
                <img id="swiper_fist_pic" :src="pic.src" v-if="index == 0"/>
                <img id="swiper_fist_pic" class="swiper-lazy" :src="pic.src" v-if="index != 0"/>
                <div class="swiper-lazy-preloader box21" v-if="index != 0"></div>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </div>
</template>

<script>

	// import Lib from '@/assets/js/Lib';

	export default {
    name: 'ShopSwiper',
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
		methods: {}
	}

</script>

