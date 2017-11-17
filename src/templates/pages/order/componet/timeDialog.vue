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
import VuePickers from 'vue-pickers'
export default {
  name: "timeDialog",
  data: function() {
    return {
        name:'选择提货时间',
        isShow : true,
        pickData1: {
            columns: 1, // picker的列数
            // 第一列的数据结构
            pData1: [
                {
                text: 1999,
                value: 1999
                },
                {
                text: 2001,
                value: 2001
                },
                {
                text: 2002,
                value: 2002
                },
                {
                text: 2003,
                value: 2003
                },
                {
                text: 2004,
                value: 2004
                },
                {
                text: 2005,
                value: 2005
                },
            ]
        },
    };
  },
  components: {
    spDialog,VuePickers
  },
  watch: {
    
  },
  methods: {
     close(){

    },
    confirmFn(){

    },
  },
  mounted() {
    
  }
};
</script>
<style lang="less" >
.area_btn_box{
    display: none
}
.area_ctrl{
    background-color:#fff;
    position: relative;
    .tooth{
        border:1px solid;
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
</style>

