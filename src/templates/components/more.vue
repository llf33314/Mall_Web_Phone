<template>
  <section class="more-main" :class="{'margin-bottom-clear' : !$store.state.isShowFooter}">
    <p v-show="isMore == 2">加载中，请稍等……</p>
    <p v-show="isMore == 3">抱歉,没有更多了</p>
    <!-- <p v-show="isMore == 4">网络繁忙，请稍后试试吧</p> -->
  </section>
</template>
<script>
module.exports = {
  props: ["isMore"], //1 未加载；2 加载中 ；3 没有更多了；4 出错了
  data: function() {
    return {};
  }
};
</script>
<style>
.more-main {
  width: 100%;
  font-size: 0.3rem;
  color: #737373;
  text-align: center;
  padding: 0.25rem 0;
  padding-bottom: 60px;
}

.more-main p {
  margin-bottom: 0.05rem;
  text-align: center;
}

.margin-bottom-clear {
    margin-bottom: 0!important;
}
</style>