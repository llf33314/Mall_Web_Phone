<template>
  <div class="classify">
    <table cellpadding="0" cellspacing="0" width="100%" v-html="data.dom"></table>
  </div>
</template>

<script>

	// import Lib from '@/assets/js/Lib';

	export default {
    name: 'Classify',
		data() {
			return {}
		},
    props:{
      data:{
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
      $(this.$el).find("td span").remove()
		},
		//相关操作事件
		methods: {}
	}

</script>
