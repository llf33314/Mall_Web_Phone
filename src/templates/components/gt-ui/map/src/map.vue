<template>
    <div>
      <popup v-model="value" position="right" class="mint-popup-3" :modal="false">
          <!--<a @click="handleAction('confirm')" class="page-back router-link-active"><i class="mintui mintui-back"></i><span>返回</span></a>-->
          <iframe id="mapPage" width="100%" height="100%" frameborder=0 src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GQKBZ-BKZW6-ZCVSQ-MD5GX-MYNBQ-LSBPK&referer=myapp"></iframe>
      </popup>
    </div>
</template>

<script>
  import { Popup } from "mint-ui";
	export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
    },
		components: {
      Popup
    },
		//实例初始化最之前，无法获取到data里的数据
		beforeCreate() {

		},
		//在挂载开始之前被调用
		beforeMount() {


		},
		//已成功挂载，相当ready()
		mounted() {

    },
    destroyed(){

    },
		//相关操作事件
		methods: {
      handleAction(action) {
        this.callback(action);
        this.value = false;
      }
    },
    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
      }
    },
	}

</script>
<style type="text/css" lang="less">
  .mint-popup-3{
    width: 100%;
    height: 100%;
  }
  .page-back{
    font-size: 40px;
    padding: 10px;
    line-height: 30px;
    span{
      font-size: 18px;
    }
  }

</style>
