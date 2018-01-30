<template>
  <div class="setup-main">
       <section class="apply-main">
        <div class="apply-form">
            <div class="apply-item border">
                <div class="apply-title fs40">
                    商城名称
                </div>
                <div class="apply-txt fs40">
                    <input placeholder="请输入商城名称">
                </div>
            </div>
            <div class="apply-item border">
                <div class="apply-title fs40">
                    联系电话
                </div>
                <div class="apply-txt fs40">
                    <input placeholder="请输入联系电话">
                </div>
            </div>
            <div class="apply-item border">
                <div class="apply-title fs40">
                    QQ
                </div>
                <div class="apply-txt fs40">
                    <input placeholder="请输入QQ号码">
                </div>
            </div>
            <div class="apply-item2">
                <div class="apply-title fs40">
                    商场头像
                </div>
                <div class="apply-txt fs40">
                    <div class="img-upload1">
                        <i class="iconfont icon-jia"></i>
                        <input type="file" >
                    </div>
                </div>
            </div>
            <div class="apply-item2">
                <div class="apply-title fs40">
                    banner
                </div>
                <div class="apply-txt fs40">
                     <div class="img-upload2">
                        <i class="iconfont icon-jia"></i>
                        <input type="file" >
                    </div>
                </div>
            </div>
            <div class="apply-item3">
                <div class="apply-title fs40">
                    商城简介
                </div>
                <div class="apply-txt fs40" @click="tableFocus">
                    <div-textarea :text='text' v-on:newText="newdata"
                        class="right-txt"></div-textarea>
                </div>
            </div>
        </div>
    </section>
    <section class="sale-buttom fs52 shop-footer-ab">
        <div class="shop-max-button shopBlue-bg"
             @click="apply">
            确认
        </div>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import divTextarea from 'components/divTextarea'
import shopDialog from 'components/shopDialog'
export default {
  data(){
    return{
        text:'请填写商城简介'
    }
  },
  components:{divTextarea,shopDialog
  },
  methods:{
        newdata(data){
            this.newText = data;
        },
        tableFocus(){
            $('.table').focus();
        },
        apply(){
            var _this = this;
            _this.disableScroll();
            var msg = {
                'btnNum': '1',//按钮数
                'dialogTitle': '提交成功',//提示,
                'dialogMsg': '您已提交申请，请耐心等待',//内容,
                'btnOne': '好的',//确定
                'callback': {
                    'btnOne': function () {

                    },
                    'btnTow': function () {
                    }
                }
            }
            _this.$root.$refs.dialog.showDialog(msg);
        }
  }
}
</script>

<style lang="less" scoped>
@import  (reference) '~assets/css/base.less';
@import  (reference) '~assets/css/mixins.less';


.apply-main{
    width: 100%;
    padding-left: 25/@dev-Width *1rem;
    .apply-item{
        height: 120/@dev-Width *1rem;
    }
    .apply-item2{
        padding: 10/@dev-Width *1rem;
        height: auto;
    }
    .apply-item,.apply-item2,.apply-item3{
        width: 100%;
        .ik-box;
        .ik-box-align(center);
        .apply-title{
            width: 20%;
        }
        .apply-txt{
            width: 80%;
            input{
                width: 100%;
                padding: 15/@dev-Width *1rem 0;
                border: 0;
            }
            .apply-tel{
                width: 68%;
            }
            .apply-tel-button{
                display: inline-block;
                width: 30%;
                padding: 30/@dev-Width *1rem 0;
                text-align: center;
                border-left: 1px solid #e8e8ed;
            }
        }
    }
    .apply-item3{
        width: 100%;
        .ik-box-align(start);
        height: auto;
        padding: 30/@dev-Width *1rem 0;
        .apply-txt{
            min-height: 200/@dev-Width *1rem;
            color: #999;
        }
    }
    .apply-buttom {
        margin-top: 25%;
        height: 148/@dev-Width *1rem;
        p{
            margin-top: 28/@dev-Width *1rem;
            color: #87858f;
        }
    }
}

.sale-buttom{
    width: 100%;
    margin: 10% auto 5%;
    padding: 0 40/@dev-Width *1rem;
    &>div{
        height: 138/@dev-Width *1rem;
        margin-bottom: 40/@dev-Width *1rem;
    }

}
.apply-main{
    background: #fff;
}
.img-upload1,.img-upload2{
    position: relative;
    color: #999;
    border: 1px dashed #cacaca;
    text-align: center;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(center);
    color: #cacaca;
    i{
        font-size: 68/@dev-Width *1rem;
    }
    input{
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        opacity: 0;
    }
}
.img-upload1{
    width: 170/@dev-Width *1rem;
    height: 170/@dev-Width *1rem;
}
.img-upload2{
    width: 80%;
    height: 170/@dev-Width *1rem;
}
</style>