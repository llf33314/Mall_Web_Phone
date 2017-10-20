<template>
  <div class="shop-wrapper" style="height: 100%;">
        <section class="shop-main fs40 address-main">
            <div class="indexborder clearfix">
                 <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        收件人
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="姓名" class="right-txt">
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        联系电话
                    </div>
                    <div class="shop-fl right">
                        <input placeholder="手机号码" class="right-txt">
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择省
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt">
                            <option>aaaa</option>
                        </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择市
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt">
                            <option>aaaa</option>
                        </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        选择区
                    </div>
                    <div class="shop-fl right">
                        <select class="right-txt">
                            <option>aaaa</option>
                        </select>
                    </div>
                </div>
                <div class="address-list border clearfix">
                    <div class="shop-fl left">
                        详细地址
                    </div>
                    <div class="shop-fl right" @click="tableFocus">
                         <div-textarea :text='text' v-on:newText="newdata"
                            class="right-txt"></div-textarea> 
                    </div>
                </div>
            </div>
        </section>
        <section class="address-button fs52">
            <div class="shop-max-button shop-bg">
               保存 
            </div>
        </section> 
        <section class="shop-footer-ab">
            <div class="shop-logo"></div>
        </section>
  </div>
</template>

<script>
import Lib from 'assets/js/Lib';
import divTextarea from '../../../components/divTextarea'
export default {
    name: 'address',	
    data () {
        return {
            text:'街道门牌信息',
            newText:''
        }
    },
    mounted() {
       //todo 组件 divTextarea数据传出
    },
    components:{
        divTextarea
    },
    methods: {
        newdata(data){
            this.newText = data;
        },
        tableFocus(){
            $('.table').focus();
        }
    }
}
</script>

<style lang="less" scoped>

@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';

.address-main{
    background: #fff;
    padding-left:  28 / @dev-Width * 1rem;
    .left{
        width: 20%;
    }
    .right{
        width: 80%;
        height: 100%;
        input{
            width: 100%;
            height: 98%;
            border: 0;
            color: #666;
        }
        select{
            width: 100%;
            height: 98%;
            border: 0;
            color: #666;
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;
            background: url("../../../assets/img/icon/left.png") no-repeat scroll 96% center transparent;
            padding-right: 14px;
            background-size: 8%;
        }
        select::-ms-expand { display: none;}
        .table{
            color: #666;
            width: 98%;
            max-height: 200%;
            border: 0; 
            outline: 0;   
            word-wrap: break-word;  
            overflow-x: hidden;  
            overflow-y: auto;  
        }
    }
}
.address-button{
    height: 140/ @dev-Width * 1rem;
    margin: 20% auto 0;
    width: 90%;
}
.address-list{
    width: 100%;
    .left{
        line-height: 3.5em;
    }
    .right{
        .right-txt{
            padding: 40/ @dev-Width * 1rem 0 35/ @dev-Width * 1rem 0;;
        }
    }
}

</style>
