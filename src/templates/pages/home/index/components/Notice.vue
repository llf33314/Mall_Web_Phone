<template>
    <div>
      <div class="noticeNavModule">
        <div class="custom-notice" v-roll><span>{{data.text}}</span></div>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'Notice',
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
