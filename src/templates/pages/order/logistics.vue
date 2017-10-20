<template>
<div class="shop-wrapper  order-wrapper" id='app'>
    <section class="fs40 logistics-header clearfix">
        <div class="order-header-img">
        <defaultImg :background="background"
                     :isHeadPortrait="1">
        </defaultImg>
        </div>
        <div class="order-header-txt">
            <div class="order-header-title fs45">物流状态
                <span>已签收</span>
            </div>
            <div class="fs40">
                <p>承运来源 : <span>顺丰快递 </span></p>
                <p>运单编号 : <span>25462147854568</span> </p>
                <p>官方电话 : <span class="shopBlue">96666</span></p>
            </div>
        </div>
    </section>
    <!-- 未开发功能<section class="logistics-Tel">
        <div class="logistics-Tel-men fs36 clearfix">
            <div class="logistics-Tel-img">
            </div>
            <div class="logistics-Tel-name">
                派送员
                <p class="fs46">王小二</p>
            </div>
        </div>
        <div class="logistics-Tel-phone">
            <i class="iconfont icon-dianhua"></i>
            <i class="iconfont icon-jiantou-copy"></i>
        </div>
    </section> -->
    <section class="order-content logistics-content">
        <div class="logistics-title fs46 border">
            <div class="logistics-img">
                <defaultImg :background="background"
                            :isHeadPortrait="1">
                </defaultImg>
            </div>
            本数据由<span class="shopBlue">多粉物流信息</span>提供
        </div>
        <div class="logistics-list">
            <div class="logistics-item border ">
                    <p class="fs42 logistics-txt">[惠州市] 【已签收，签收人是本人】，感谢使用顺丰 快递，期待再次为您服务。</p>
                    <p class="fs36">2017-06-23 20:20:24</p>
                    <em></em>
            </div>
            <div class="logistics-item border">
                    <p class="fs42 logistics-txt">[惠州市]   惠州市惠城区桥东街道派件员：王二小 <span class="shopBlue">1368234541</span>正在为您派件</p>
                    <p class="fs36">2017-06-23 20:20:24</p>
                    <em></em>
            </div>
            <div class="logistics-item border">
                    <p class="fs42 logistics-txt">[惠州市] 【已签收，签收人是本人】，感谢使用顺丰 快递，期待再次为您服务。</p>
                    <p class="fs36">2017-06-23 20:20:24</p>
                    <em></em>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import Lib from 'assets/js/Lib'; 
import defaultImg from 'components/defaultImg'//图片组件

export default {
    name: 'logistics',	

    data () {
        return {
            background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501765343077&di=5d3652848769c1abd7eb25dea007bb1d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dcf8442791bd8bc3ec65d0eceb7bb8a28%2Fb3119313b07eca80c63dcea4932397dda14483bd.jpg'
        }
    },
    components:{
        defaultImg
    },
    mounted() {
        
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>

@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';

//查看物流
.logistics-header{
    width: 100%;
    padding: 48/ @dev-Width *1rem  38/ @dev-Width *1rem;
    background: #fff;
    margin-bottom: 36/ @dev-Width *1rem;
    .order-header-img{
        float: left;
        width: 200/@dev-Width *1rem;
        height: 200/@dev-Width *1rem;
        border: 1px solid #ededed;
        overflow: hidden;
        img{
            height: 100%;
            width: auto;
            margin: 0 auto;
        }
    }
    .order-header-txt{
        float: right;
        width: 75%;
        color: #999;
        .order-header-title{
            color: #333;
            span{
                color: #25ae5f;
                margin-left: 10/ @dev-Width *1rem
            }
        }
    }
}
/*未开发功能
.logistics-Tel{
    width: 100%;
    margin-bottom: 36/ @dev-Width *1rem;
    padding-left: 40 /@dev-Width *1rem;
    background: #fff;
    font-size: 0;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(justify);
    height: 164 /@dev-Width *1rem;
    .logistics-Tel-men{
        position: relative;
        .logistics-Tel-img{
            float: left;
            width: 120 /@dev-Width *1rem;
            height: 120 /@dev-Width *1rem;
            .border-radius(100%);
            // background: url('../../image/kuaidiyuan.png') no-repeat ;
            background-size: cover;
            border: 1px solid #ededed;
        }
        .logistics-Tel-name{
            margin-left: 30 /@dev-Width *1rem;
            float: left;
            color: #999;
            p{
                margin-top: 10 /@dev-Width *1rem;
                color: #333; 
            }
        }
    }
    .logistics-Tel-phone{
        i{
            display: inline-block;
            margin-right: 48 /@dev-Width *1rem;
        }
        &>i:first-child{
            font-size: 60 /@dev-Width *1rem;
            color: #ff9800;
        }
        &>i:last-child{
            font-size: 40 /@dev-Width *1rem;
            color: #c7c7cc;
            
        }
    }
}*/
.order-content{
    width: 100%;
    background: #fff;
    .logistics-title{
        padding: 50/ @dev-Width *1rem 35/ @dev-Width *1rem;
        line-height: 1; 
        .logistics-img{
            width: 60/ @dev-Width *1rem;
            height: 60/ @dev-Width *1rem;
            .border-radius(100%);
            margin-right: 20/ @dev-Width *1rem;
            border: 1px solid #ededed;
            display: inline-block;
            overflow:hidden;
            vertical-align: text-bottom;
        }
    }
    .logistics-list{
        width: 100%;
        padding-left: 82/ @dev-Width *1rem;
        padding-right: 30/ @dev-Width *1rem;
        line-height: 1;
        overflow: hidden;
        .logistics-item{
            padding: 40/@dev-Width *1rem 0 40/@dev-Width *1rem 82/ @dev-Width *1rem ;
            position: relative;
            height: 235/@dev-Width *1rem;
            color: #999;
            .logistics-txt{
                line-height: 0.35rem;
                margin-bottom: 15/@dev-Width *1rem;
            }
            em{
                position: absolute;
                width: 25/@dev-Width *1rem;
                height: 25/@dev-Width *1rem;
                background: #dddddd;
                top: 50/@dev-Width *1rem;
                left: -((25+3)/2)/@dev-Width *1rem;
                .border-radius(100%);
                z-index: 1;
            }
            &::after{
                content: '';
                position: relative;
                display: inline-block;
                width: 3/@dev-Width *1rem;
                height: 200%;
                background: #dddddd;
                left: -(86)/@dev-Width *1rem;
                top: -(120)/@dev-Width *1rem;;
            }
        }
        &>div:first-child{
            color: #0bb453;
            em{
                background: #0bb453;
                box-shadow: 0px 0px 0px 2px  rgba(11, 180, 83, 0.3);
            }
        }
    }
}

</style>
