<template>
  <div class="table fs42" contenteditable="true" id="a" autofocus="autofocus"
        v-html="newText"
        placeholder="选填"
        @click="table_focus()"
         @blur="table_blur()" ></div>
</template>
<script>
export default {
  props: ["text"],
  data: function() {
    return {
      newText: ""
    };
  },
  mounted() {
    this.table_focus();
  },
  methods: {
    table_focus() {
      this.newText = this.text;
      $("#a").focus();
    },
    table_blur() {
      var nowText = $("#a").html(); //输入的内容
      if (nowText == null || nowText == "") {
        $("#a").html("");
      }
      this.$emit("newText", nowText);
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  width: 98%;
  height: 200%;
  border: 0;
  outline: 0;
  word-wrap: break-word;
  // border: 1px solid #ddd;
}
</style>
