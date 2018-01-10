<template>
    <div>
      <div class="tpl-shop" v-if="data.radio">
        <div class="tpl-shop-header" style="background-color:#ffffff" :style="{'backgroundImage': 'url(' + picJson.stoPicture + ')'}">
          <div class="tpl-shop-title">{{picJson.stoName}}</div>
          <div class="tpl-shop-avatar">
            <img :src="picJson.headImg" alt="头像">
          </div>
        </div>
        <div class="tpl-shop-content">
          <ul class="clearfix">
            <li class="js-all-goods">
              <a href="javascript:void(0);" @click="shoppingall();">
                <span class="count">{{picJson.countproduct}}</span>
                <span class="text">全部商品</span>
              </a>
            </li>
            <li class="js-new-goods">
              <a href="javascript:void(0);" @click="shoppingall();">
                <span class="count">0</span>
                <span class="text">新上商品</span>
              </a>
            </li>
            <li class="js-order">
              <a href="javascript:void(0);"  @click="toOrder();">
                <span class="count user"></span>
                <span class="text">我的订单</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ShopHeader",
  data() {
    return {};
  },
  props: {
    data: {
      type: [Object, Array]
    },
    _page: {
      type: Number
    },
    picJson: {
      type: [Object, Array]
    }
  },
  components: {},
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  //在挂载开始之前被调用
  beforeMount() {},
  //已成功挂载，相当ready()
  mounted() {},
  //相关操作事件
  methods: {
    shoppingall() {
      let pageData = this.$parent.pageData;
      this.$router.push(
        "/classify/" + pageData.shopId + "/" + pageData.busId + "/0/k=k"
      );
    },
    toOrder() {
      let pageData = this.$parent.pageData;
      this.$router.push("/order/list/"+pageData.busId+"/0");
    }
  }
};
</script>
