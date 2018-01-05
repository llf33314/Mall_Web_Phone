<template>
    <div>
      <div class="guideModule">
        <div class="bor" :style="{'borderTopColor':data.color,'borderTopStyle':data.style==1?'dashed':'solid','margin': '0 ' + data.leftSide?'10px':'0'}"></div>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'Guide',
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

