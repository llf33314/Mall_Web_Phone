<template>
    <div>
      <div class="textNavModule">
        <div class="list" v-for="data in data.list">
          <span v-if="data.title">{{data.title}}</span>
          <i class="icon-arrow"></i>
        </div>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'TextNav',
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

