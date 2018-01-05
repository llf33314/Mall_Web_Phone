<template>
    <div>
      <div class="titleModule van-hairline--top-bottom" v-if="data.titleWay==0" :style="{'textAlign': data.showWay,'backgroundColor':data.background}">
        <div class="title">
          <span v-if="data.title">{{data.title}}</span>
          <span v-if="data.navName" class="custom-title-link-container">
    		<span class="custom-title-link" v-if="data.navName">
    			<span class="gray">-</span>
    			<a>{{data.navName}}</a>
    		</span>
    	</span>
        </div>
        <div class="sub_title" v-if="data.viceTitle">{{data.viceTitle}}</div>
      </div>

      <div class="titleModule van-hairline--top-bottom" v-if="data.titleWay==1">
        <div class="title">
          <span v-if="data.title">{{data.title}}</span>
        </div>
        <div class="sub_title">
          <span class="sub_title_date" v-if="data.time">{{data.time}}</span>
          <span class="sub_title_author" v-if="data.author">{{data.author}}</span>
          <span class="sub_title_link" v-if="data.linkName">{{data.linkName}}</span>
        </div>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'ShopTitle',
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

