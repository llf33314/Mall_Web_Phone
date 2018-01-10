<template>
    <div>
      <div class="goShopModule van-hairline--top-bottom">
        <a class="custom-store-link" @click="jumpShop">
          <i class="custom-store-img"></i>
          <span class="custom-store-name">{{data.stoName}}</span>
          <span class="custom-store-enter">{{data.name}}</span>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: "GoShop",
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
    jumpShop() {
      let pageData = this.$parent.pageData;
      this.$parent.$parent.$parent.getPageId(
        pageData.busId,
        pageData.shopId,
        true
      );
    }
  }
};
</script>

