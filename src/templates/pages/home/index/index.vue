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
    };
  },
  components: {
    Admin
  },
  beforeDestroy() {
  },

  mounted() {
    this.$store.commit("show_footer", true);
    // console.log(this.$store.state.showfooter,"this.$store")
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.main-divs {
  margin-bottom: 63px;
  
}
</style>
