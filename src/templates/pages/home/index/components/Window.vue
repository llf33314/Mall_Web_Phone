<template>
    <div>
      <div class="windowModule" :class="{'borNo':data.picGap==1}">
        <div v-if="data.title" class="windowModule-wrap-title" v-bind="data.title"></div>
        <div class="windowModule-pic" v-if="data.showWay==0">
          <div class="windowModule-pic-left bg-cover bg7" :style="{backgroundImage: 'url(' + data.pic[0].src + ')'}"></div>
          <div class="windowModule-pic-right">
            <div class="bg-cover bg7" :style="{backgroundImage: 'url(' + data.pic[1].src + ')'}"></div>
            <div class="bg-cover bg7" :style="{backgroundImage: 'url(' + data.pic[2].src + ')'}"></div>
          </div>
        </div>
        <div class="windowModule-pic way02" v-if="data.showWay==1">
          <div class="bg-cover" :style="{backgroundImage: 'url(' + data.pic[0].src + ')'}"></div>
          <div class="bg-cover windowModule-pic-center" :style="{backgroundImage: 'url(' + data.pic[1].src + ')'}"></div>
          <div class="bg-cover" :style="{backgroundImage: 'url(' + data.pic[2].src + ')'}"></div>
        </div>
        <div class="main">
          <div v-if="data.contentTitle" class="windowModule-body-title" v-bind="data.contentTitle"></div>
          <div v-if="data.contentExplain" class="windowModule-body-desc" v-bind="data.contentExplain"></div>
        </div>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'Window',
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

