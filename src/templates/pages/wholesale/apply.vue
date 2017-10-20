<template>
<div id='app' class="shop-wrapper apply-wapper">
    <header class="apply-notice">
        <i>i</i>
        <p class="fs40">基本信息的有效性决定您能否成为批发商，以及最终可获得 的折扣</p>
    </header>
    <section class="apply-main">
        <div class="apply-form">
            <div class="apply-item border">
            <div class="apply-title fs40">
                姓名
            </div>
            <div class="apply-txt fs40">
                <input placeholder="请输入本人真实姓名">
            </div>
        </div>
        <div class="apply-item border">
            <div class="apply-title fs40">
                公司名称
            </div>
            <div class="apply-txt fs40">
                <input placeholder="请输入公司名称">
            </div>
        </div>
        <div class="apply-item border">
            <div class="apply-title fs40">
                手机号
            </div>
            <div class="apply-txt fs40">
                <input placeholder="请输入手机号" class="apply-tel">
                <span class="apply-tel-button shop-font">
                    获取验证码
                </span>
            </div>
        </div>
        <div class="apply-item border">
            <div class="apply-title fs40">
                验证码
            </div>
            <div class="apply-txt fs40">
                <input placeholder="请输入验证码">
            </div>
        </div>
        <div class="apply-item border">
            <div class="apply-title fs40">
                备注
            </div>
            <div class="apply-txt fs40" @click="tableFocus">
                <div-textarea :text='text' v-on:newText="newdata"></div-textarea>
            </div>
        </div>
        </div>
        <div class="apply-buttom fs52">
            <div class="shop-max-button shop-bg" 
                @click="apply">
                申请
            </div>
            <p class="fs40">批发商申请说明</p>
        </div>
    </section>
    <section class="shop-footer-ab shop-footer">
        <div class="shop-logo"></div>
    </section>
    <shop-dialog ref="dialog"></shop-dialog>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import shopDialog from 'components/shopDialog'
import divTextarea from 'components/divTextarea'
export default {
    name: 'apply',	

    data () {
        return {
            text:'街道门牌信息',
            newText:''
        }
    },
    components:{
        shopDialog,divTextarea
    },
    methods: {
        tableFocus(){
            $('.table').focus();
        },
        newdata(data){
            this.newText = data;
        },
        apply(){
            var _this = this;
            //_this.disableScroll();
            let msg = {
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
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
.apply-wapper{
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
    .apply-notice{
        font-size: 0;
        width: 100%;
        padding: 20/@dev-Width *1rem 50/@dev-Width *1rem;
        p{
            width: 88%;
            display: inline-block;
            color: #87858f;
        }
        i{
            text-align: center;
            line-height: 78/@dev-Width *1rem;
            display: inline-block;
            width: 80/@dev-Width *1rem;
            height: 80/@dev-Width *1rem;
            font-size: 48/@dev-Width *1rem;
            background: #10aeff;
            .border-radius(100%);
            color: #fff;
            margin-right: 40/@dev-Width *1rem;
            margin-top: 20/@dev-Width *1rem;
            vertical-align: top;
        }
    }
    .apply-main{
        width: 100%;
        padding-left: 25/@dev-Width *1rem;
        .apply-item{
            width: 100%;
            height: 120/@dev-Width *1rem;
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
        .apply-buttom {
            margin-top: 25%;
            height: 148/@dev-Width *1rem;
            p{
                margin-top: 28/@dev-Width *1rem;
                color: #87858f;
            }
        }
    }
}
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
</style>
