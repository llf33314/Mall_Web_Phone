<template>
     <sp-dialog 
        :title="name"
        :visible.sync="isShow"
        :center="'center'">
         <vue-pickers :show="isShow"
            :selectData="pickData1"
            v-on:cancel="close"
            v-on:confirm="confirmFn"></vue-pickers>
     </sp-dialog>
</template>
<script>
import spDialog from "components/spDialog";
import VuePickers from "vue-pickers";
export default {
  name: "timeDialog",
  props: ["name", "dialogList", "type", "busId","selectData"],
  data: function() {
    return {
      isShow: true,
      pickData1: {
        columns: 1, // picker的列数
        // 第一列的数据结构
        pData1: [
          {
            text: 1999,
            value: 1999
          }
        ]
      }
    };
  },
  components: {
    spDialog,
    VuePickers
  },
  watch: {
    isShow() {
      this.$emit("update:closeDialog", this.isShow);
      this.$emit("closeDialog-change", this.isShow);
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    confirmFn(data) {
      this.$emit("selectDialog", [this.type, data.select1.value, this.busId]);
       this.isShow = false;
    }
  },
  mounted() {
      console.log("selectData",this.selectData)
    // this.dialogList
    let _this = this;
    let _data = (this.pickData1.pData1 = []);
    this.dialogList.forEach((element, index) => {
      let _time = {
        text: element.times + " " + element.startTime + "-" + element.endTime,
        value: element
      };
      _this.$set(_data, index, _time);
    });
  }
};
</script>
<style lang="less" >
.area_ctrl {
  background-color: #fff;
  position: relative;
  .tooth {
    display: -webkit-box;
    display: -moz-box;
    display: -o-box;
    display: box;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    box-align: center;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    box-pack: justify;
  }
}
.shop-main-no2 .sp-dialog-title-center {
  height: 0;
  padding: 0rem !important;
  & > div {
    position: absolute;
    z-index: 9902;
    top: 0.7em !important;
    width: 50% !important;
    left: 25%;
  }
  i {
    display: none;
  }
}
</style>

