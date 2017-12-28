<template>
  <div class="main-divs">
    <Admin/>
  </div>
</template>
<script>
import Admin from "./components/Admin";
export default {
  data() {
    return {
      materialUrl: "https://deeptel.com.cn/mallPage/82/79B4DE7C/pageIndex.do"
    };
  },
  components: {
    Admin,
  },

  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.main-divs {
  margin-bottom: 63px;
}
</style>
