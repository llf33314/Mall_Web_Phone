<template>
    <div>
      <div class="search">
        <div style="margin: 0 auto;position: relative;"
             :style="{'width': conversion(data.attr.width) +'rem','height': conversion(data.attr.height + 2) + 'rem'}">
          <input type="text"
                 placeholder="请输入搜索关键字"
                 style="width:100%;height:100%;"
                 :style="{'borderColor':data.attr.borderColor,'color':data.attr.color,'backgroundColor':data.attr.bgColor}">
          <i class="find_icon"></i>
        </div>
      </div>
    </div>
</template>

<script>

	// import Lib from '@/assets/js/Lib';

	export default {
    name: 'Search',
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


		},
		//相关操作事件
		methods: {
      conversion(num){
        return num / (320/(1242/150));
      }
    }
	}

</script>
