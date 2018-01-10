<template>
    <div>
      <div class="search">
        <div :style="{'width': conversion(data.attr.width) +'rem','height': conversion(data.attr.height + 2) + 'rem'}">
          <input type="text" @click="search"
                 placeholder="搜索商品"
                 style="width:100%;height:100%;"
                 :style="{'borderColor':data.attr.borderColor,'color':data.attr.color,'backgroundColor':data.attr.bgColor}">
          <i class="find_icon"></i>
        </div>

      </div>
    </div>
</template>

<script>

	

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
      },search(){
        let _pageData = this.$parent.pageData;
        this.$router.push("/search/"+_pageData.busId+"/0/k=k");
      }
    }
	}

</script>
