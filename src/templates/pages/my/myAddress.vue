<template>
   <section class="shop-main fs40 my-add">
        <div class="shop-add-itme fs36" itmeid="1">
            <div class="shop-add-txt border clearfix">
                <div class="add-left">
                    <p>
                        广东省惠州市惠城区东平大道赛格假日广场赛格大厦10楼1007-1
                        008广东谷通(多粉)
                    </p>
                    <p>小多<span>1585752833</span></p>
                </div>
                <div class="add-right">
                    <i class="iconfont icon-jiantou-copy"></i>
                </div>
            </div>
            <div class="shop-add-footer">
                <div class="shop-add-button1"
                    @click="setupDefault($event,1)">
                    <i class="iconfont icon-dui"></i>
                    设为默认
                </div>
                <div class="shop-add-button2">
                    <span>
                        <i class="iconfont icon-bianji"></i>
                        编辑
                    </span>
                    <span  @click="deleteItme($event)">
                        <i class="iconfont icon-shanchu"></i>
                        删除
                    </span>
                </div>
            </div>
            (差 新增收货地址按钮和技术支持图片)
        </div>
    </section>
</template>

<script>
import Lib from 'assets/js/Lib';

export default {
    name: 'myAddress',	

    data () {
        return {
            isShow: false
        }
    },
    mounted() {
        
    },
    methods: {
        /**
         * 设置默认地址
         */
        setupDefault(e,id){
            $('.icon-dui').css({
                'background-color':''
            })
            var itemID=$(e.target).parents('.shop-add-itme').attr('itmeid');
            console.log(id,itemID);
            if(id == itemID){
                var _default = $(e.target).find('i')||$(e.target);
                _default.css({
                    'background-color':'#e4393c'
                })
            }
        },
        /**
         * 删除地址
         */
        deleteItme(e){
            console.log(1);
            $(e.target).parents('.shop-add-itme').remove();
        }
    }
}
</script>

<style lang="less" scoped>

@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
.shop-add-itme{
    margin-bottom: 10/@dev-Width *1rem;
}

</style>
