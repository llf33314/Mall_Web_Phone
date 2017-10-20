<template>
    <div id='app' class="shop-wrapper apply-wapper"
        style="background: #f0f2f5;">
        <header class="sale-notice">
            <i class="sale-icon">!</i>
            <p class="fs40">基本信息的有效性决定您能否成为超级销售员。</p>
        </header>
        <section class="apply-main">
            <div class="apply-form">
                 <div class="apply-item border">
                    <div class="apply-title fs40">
                        <em class="shop-font">*</em> 姓名
                    </div>
                    <div class="apply-txt fs40">
                        <input placeholder="请输入本人真实姓名">
                    </div>
                </div>
                <div class="apply-item border">
                    <div class="apply-title fs40">
                        &nbsp 公司名称
                    </div>
                    <div class="apply-txt fs40">
                        <input placeholder="请输入公司名称">
                    </div>
                </div>
                <div class="apply-item border">
                    <div class="apply-title fs40">
                        <em class="shop-font">*</em> 手机号码
                    </div>
                    <div class="apply-txt fs40">
                        <input placeholder="请输入手机号" class="apply-tel">
                    </div>
                </div>
                <div class="apply-item ">
                    <div class="apply-title fs40">
                        <em class="shop-font">*</em> 验证码
                    </div>
                    <div class="apply-txt fs40">
                        <input placeholder="请输入手机号" class="apply-tel">
                        <span class="apply-tel-button shopBlue">
                            获取验证码
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <section class="apply-main sale-section">
            <p class="sale-margin"></p>
            <div class="apply-item">
                <div class="apply-title fs40">
                    &nbsp 备注
                </div>
                <div class="apply-txt fs40 table-box" @click="tableFocus">
                     <div-textarea :text='text' v-on:newText="newdata"
                            class="right-txt"></div-textarea>
                </div>
            </div>
        </section>
        <section class="sale-buttom fs52">
            <div class="shop-max-button shopBlue-bg" 
                @click="apply">
                申请
            </div>
            <p class="fs36 shopGray">您可以通过多种方式进行推广，将客户引导到我们的商场或关注我 们的公众号，只要他们购买了符合成标准的产品，您就可以自动赚 取佣金</p>
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
    import headerNav from 'components/headerNav'
    import divTextarea from '../../../components/divTextarea'
    export default {
        data(){
            return{
                homeNav:['基本信息','自选商品'],
                text:'请输入备注'
            }
        },
        components:{
            headerNav,shopDialog,divTextarea
        },
        methods:{
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
            },
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

.sale-wrapper{
    width: 100%;
    position: relative;
    .sale-header{
        width: 100%;
        height: 520/@dev-Width *1rem;
        background: url('../../../assets/img/sale.jpg')no-repeat;
        background-size: cover;
        .ik-box;
        .ik-box-pack(center);
        .ik-box-align(center);
        .ik-box-orient(vertical);
        color: #fff;
        .header-img{
            width: 204/@dev-Width *1rem;
            height: 204/@dev-Width *1rem;
            background-size:cover;
            background-position: center;
            .border-radius(100%);
            margin-bottom: 20/@dev-Width *1rem;
        }
    }
    .index-main{
        width: 100%;
        background: #fff;
        .index-msg{
            width: 100%;
            .ik-box;
            height: 250/@dev-Width *1rem;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2)
        }
        .index-msg-item{
            width: 33.33%;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-orient(vertical);
            height: 100%;
            .ik-box;
        }
        .index-nav{
            width: 100%;
            &>div:nth-child(3n){
                border-right: 0;
            }
        }
        .nav-item{
            float: left;
            width: 33.333%;
            height: 400/@dev-Width *1rem;
            border-bottom: 1px solid #ededed;
            border-right: 1px solid #ededed;
            .ik-box;
            .ik-box-align(center);
            .ik-box-pack(center);
            .ik-box-orient(vertical);
            p{
                text-align: center;
            }
        }
        .nav-icon{
            font-size: 0;
            width: 150/@dev-Width *1rem;
            height: 150/@dev-Width *1rem;
            text-align: center;
            line-height: 150/@dev-Width *1rem;
            background: url('../../../assets/img/nav_bg.png') repeat;
            .border-radius(10px);
            margin-bottom: 32/@dev-Width *1rem;
            i{
                font-size: 100/@dev-Width *1rem;
                color: #fff;
            }
        }
    }
}
.setup-main{
    width: 100%;
    margin-top: 30/@dev-Width *1rem;
}
.sale-notice,.sale-header{
    color:#999;
    width: 100%;
    height: 115/@dev-Width *1rem;
    padding-left: 56/@dev-Width *1rem;
    .ik-box;
    .ik-box-align(center);

}

.setup-main{
    width: 100%;
    margin-top: 30/@dev-Width *1rem;
}
.sale-notice,.sale-header{
    color:#999;
    width: 100%;
    height: 115/@dev-Width *1rem;
    padding-left: 56/@dev-Width *1rem;
    .ik-box;
    .ik-box-align(center);

}
.sale-notice{
    background: #f0f2f5;
    i{
        font-size: 0.28rem;
        background: #70b1df!important;
        width: 44/@dev-Width *1rem;
        height: 44/@dev-Width *1rem;
        text-align: center;
        line-height: 0.30rem;
        display: block;
        .border-radius(100%);
        color: #fff;
        margin-right: 10/@dev-Width *1rem;

    }
}
.sale-header{
    background: #fff;
    color: #333;
    border-bottom: 1px solid #eee;
    i{
        display: block;
        margin-right: 10/@dev-Width *1rem;
    }
}
.sale-section{
    width: 100%;
    padding: 0!important;
    height: 415/@dev-Width *1rem;
    .sale-margin{
        width: 100%;
        height: 30/@dev-Width *1rem;
        background: #f0f2f5;
    }
    .apply-item{
        padding-left:0.16666667rem;
        .apply-txt{
            color:#999;
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
.table-box{
    max-height: 200%;
    min-height: 300/@dev-Width *1rem;
    padding: 35/@dev-Width *1rem 0;
}
</style>