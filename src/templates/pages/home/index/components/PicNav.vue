<template>
    <div>
      <div class="picNavModule">
        <ul>
          <li v-for="data in data.pic">
            <a href="javascript:;">
              <span><img :src="data.src"></span>
              <span class="title" v-bind="data.title" v-if="data.title"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'PicNav',
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

