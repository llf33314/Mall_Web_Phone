<template>
  <div class="commodity">
    <!--大图-->
    <div v-if="data.page==0" class="goods-card goods-card02">
      <ul class="sc-goods-list clearfix" v-if="picJson">
        <li v-for="(pic,index) in picJson.imgID">
          <a :href="pic.url" class="link clearfix" :class="{'simpleness':data.css==1}">
            <div class="photo-block">
              <div class="photo-block img_class bg-con h292" style="display: block;" v-lazy:background-image="pic.src"></div>
            </div>

            <div v-if="data.css == 0">
              <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>
                <p class="goods-sub-title c-black" v-show="data.intro">{{pic.desc}}</p>

                <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>
                <div class="h55" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                  <div class="list-scale w1180">
                    <p class="goods-price fz35">
                      <label v-show="data.price && pic.price" class="w240" style="display: inline-block;">￥<label>{{pic.price}}</label></label> <span class="original w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                      <label v-show="data.price_other && pic.hyPrice" class="w280" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label> <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                    </p>
                  </div>
                </div>

              </div>
              <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
            </div>

            <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
              <p class="sim......pleness-title" v-show="data.name">{{pic.title}}</p>
              <p class="goods-price fz12" v-show="data.price">￥<label>{{pic.price}}</label></p>
            </div>

            <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
              <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                <p class="simpleness-big-title" v-show="data.name">{{pic.title}}</p>
                <p class="simpleness-big-price" v-show="data.price">￥<label>{{pic.price}}</label></p>
              </div>
              <p class="goods-sub-title c-black" v-show="data.intro">{{pic.desc}}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!--小图-->
    <div v-if="data.page==1" class="goods-card goods-card03">

      <ul class="sc-goods-list clearfix" v-if="picJson">
        <li v-for="pic in picJson.imgID">
          <a :href="pic.url" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
            <!-- <div class="photo-block" style="height:100px;background:url({{pic.src}}) 50% 50% no-repeat;background-size:contain;">
            </div> -->
            <div class="photo-block img_class h100" style="background: 50% 50% no-repeat;background-size:contain;background-repeat: no-repeat;background-position: center center;" v-lazy:background-image="pic.src">
            </div>
            <div v-if="data.css == 0 || data.css == 2">
              <div class="clearfix  info-price" v-if="data.name || data.price">
                <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>

                <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>
                <div class="h55" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                  <div class="w540" style="position: relative;transform: scale(0.23148148148148148);transform-origin: left top;">
                    <p class="goods-price fz35">
                      <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label>{{pic.price}}</label></label>
                      <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label>
                    </p>
                    <p class="original">
                      <span class="w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                      <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                    </p>
                  </div>
                </div>
              </div>
              <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
            </div>
            <div class="simpleness-price" v-if="data.css == 1">
              <p class="goods-price fz12" v-show="data.price">￥<label>{{pic.price}}</label></p>
            </div>
            <div class="sales" v-if="data.css == 3">
              <div class="goods-price">￥<label>{{pic.price}}</label></div>
              <div class="goods-buy">我要抢购</div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!--一大两小-->
    <div v-if="data.page==2" class="goods-card goods-card01">
      <ul class="sc-goods-list clearfix" v-if="picJson">
        <li v-for="pic in picJson.imgID">
          <a :href="pic.url" class="link clearfix" :class="{1:'simpleness'}[data.css]">
            <!-- <div class="photo-block" style="height:100px;background:url({{pic.src}}) 50% 50% no-repeat;background-size:contain;" >
            </div> -->
            <div class="photo-block img_class bg-con" v-lazy:background-image="pic.src"></div>
            <div v-if="data.css == 0">
              <div class="clearfix  info-price" v-if="data.name || data.price">
                <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>

                <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>

                <div class="h55" v-if="complete(_page)" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                  <div class="list-scale">
                    <p class="goods-price fz35">
                      <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label>{{pic.price}}</label></label> <span class="original w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                      <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label> <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                    </p>
                  </div>
                </div>

                <div class="h55" v-if="!complete(_page)" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                  <div class="w540" tyle="position: relative;transform: scale(0.23148148148148148);transform-origin: left top;">
                    <p class="goods-price fz35">
                      <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label>{{pic.price}}</label></label>
                      <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label>
                    </p>
                    <p class="original">
                      <span class="w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                      <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                    </p>
                  </div>
                </div>

              </div>
              <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
            </div>
            <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1">
              <p class="simpleness-title" v-show="data.name">{{pic.title}}</p>
              <p class="goods-price fz12" v-show="data.price">￥<label>{{pic.price}}</label></p>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!--详细列表-->
    <div v-if="data.page==3" class="goods-card goods-card04">
      <ul class="sc-goods-list clearfix" v-if="picJson">
        <li v-for="pic in picJson.imgID" :class="{1:'simpleness'}[data.css]">
          <a :href="pic.url" class="link clearfix">
            <div class="photo-block">
              <img class="img_class" v-lazy="pic.src">
            </div>
            <div class="clearfix  info-price">
              <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label">{{pic.pro_label}}</span><span>{{pic.title}}</span></p>

              <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label>{{pic.price}}</label></p>
              <div class="h55" style="overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                <div class="w540" style="position: relative;transform: scale(0.23148148148148148);transform-origin: left top;">
                  <p class="goods-price fz35">
                    <label class="w240" v-show="data.price && pic.price" style="display: inline-block;">￥<label >{{pic.price}}</label></label>
                    <label class="w280" v-show="data.price_other && pic.hyPrice" style="display: inline-block;"><span>会员</span>￥<label>{{pic.hyPrice}}</label></label>
                  </p>
                  <p class="original">
                    <span  class="w240" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;"><label><i></i>￥<label>{{pic.yjPrice}}</label></label></span>
                    <label class="w280" v-show="data.price_wholesale && pic.pfPrice" @click="pfLaye(pic.pfRemark)" onclick="return false" style="display: inline-block;color: #ff6600;"><span>批发价</span>￥<label>{{pic.pfPrice}}</label></label>
                  </p>
                </div>
              </div>
            </div>
            <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
          </a>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>

	// import Lib from '@/assets/js/Lib';

	export default {
	  name:'Commodity',
		data() {
			return {
        index: 0,
      }
		},
    props:{
	    data:{
	      type: [Object,Array]
      },
      _page:{
	      type: Number
      },
      picJson:{
        type: [Object,Array]
      }
    },
		components: {},
		//实例初始化最之前，无法获取到data里的数据
		beforeCreate() {


		},
		//在挂载开始之前被调用
		beforeMount() {
		},
		//已成功挂载，相当ready()
		mounted() {


		},
		//相关操作事件
		methods: {
      complete(param){
        if(parseInt(param/3) == param/3)return true;
      },
      pfLaye(param){
        if(!param)return;
        $(".pfj-main").html(param);
        $(".pfj").show();
      }
    }
	}

</script>

