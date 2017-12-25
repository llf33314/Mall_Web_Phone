<template>
    <div>
      <div class="groupingModule">
        <!--大图-->
        <div v-if="data.page==0" class="goods-card goods-card02">
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length>0">
            <li v-for="pic in picJson.imgID">
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block" >
                  <img :src="pic.src">
                </div>

                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                    <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label" ng-bind="pic.pro_label"></span><span ng-bind="pic.title"></span></p>
                    <p class="goods-sub-title c-black" v-show="data.intro"  ng-bind="pic.desc"></p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label ng-bind="pic.price"></label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale" style="width:1180px;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price && pic.price" style="display: inline-block;width:240px;">￥<label ng-bind="pic.price"></label></label> <span class="original" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;width:240px;"><label><i></i>￥<label ng-bind="pic.yjPrice"></label></label></span>
                          <label v-show="data.price_other && pic.hyPrice" style="display: inline-block;width:280px;"><span>会员</span>￥<label ng-bind="pic.hyPrice"></label></label> <label v-show="data.price_wholesale && pic.pfPrice" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥<label ng-bind="pic.pfPrice"></label></label>
                        </p>
                      </div>
                    </div>

                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>

                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
                  <p class="simpleness-title" v-show="data.name" ng-bind="pic.title"></p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px">￥<label ng-bind="pic.price"></label></p>
                </div>

                <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
                  <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                    <p class="simpleness-big-title" v-show="data.name" ng-bind="pic.title"></p>
                    <p class="simpleness-big-price" v-show="data.price">￥<label ng-bind="pic.price"></label></p>
                  </div>
                  <p class="goods-sub-title c-black" v-show="data.intro" ng-bind="pic.desc"></p>
                </div>
              </a>
            </li>
          </ul>
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length<=0">
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/69b0970572eb1ff21f919d265f4d1312.jpg">
                </div>

                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                    <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale" style="width:1180px;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label> <span class="original" v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label> <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>

                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>

                <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
                  <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                    <p class="simpleness-big-title" v-show="data.name">此处显示商品名称</p>
                    <p class="simpleness-big-price" v-show="data.price"><label>￥379.00</label></p>
                  </div>
                  <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                </div>

              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/86551866bfc73cd54d4036f2248d3b06.jpg">
                </div>

                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                    <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale" style="width:1180px;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label> <span class="original" v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label> <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>

                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>

                <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
                  <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                    <p class="simpleness-big-title" v-show="data.name">此处显示商品名称</p>
                    <p class="simpleness-big-price" v-show="data.price"><label>￥379.00</label></p>
                  </div>
                  <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                </div>

              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/2811e55fde033b2f87294b2b9f92080c.jpg">
                </div>

                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                    <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale" style="width:1180px;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label> <span class="original" v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label> <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>

                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>

                <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
                  <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                    <p class="simpleness-big-title" v-show="data.name">此处显示商品名称</p>
                    <p class="simpleness-big-price" v-show="data.price"><label>￥379.00</label></p>
                  </div>
                  <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                </div>

              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/2093f717f75f617bf551b63dd8bd4339.jpg">
                </div>

                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.intro || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                    <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale" style="width:1180px;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label> <span class="original" v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label> <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>

                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1 && !data.intro">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>

                <div class="simpleness-big clearfix" v-if="data.css == 1 && data.intro">
                  <div class="clearfix simpleness-big-box" v-show="data.name || data.price">
                    <p class="simpleness-big-title" v-show="data.name">此处显示商品名称</p>
                    <p class="simpleness-big-price" v-show="data.price"><label>￥379.00</label></p>
                  </div>
                  <p class="goods-sub-title c-black" v-show="data.intro">此处显示商品描述</p>
                </div>

              </a>
            </li>

          </ul>
        </div>

        <!--小图-->
        <div v-if="data.page==1" class="goods-card goods-card03">
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length>0">
            <li v-for="pic in picJson.imgID">
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
                <div class="photo-block" style="height:100px;background:50% 50% no-repeat;background-size:contain;" :style="{'backgroundImage':'url('+pic.src+')'}">
                  <!-- <img :src="{{pic.src}}"> -->
                </div>
                <div v-if="data.css == 0 || data.css == 2">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label" ng-bind="pic.pro_label"></span><span ng-bind="pic.title"></span></p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label ng-bind="pic.price"></label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price && pic.price" style="display: inline-block;width:240px;">￥<label ng-bind="pic.price"></label></label>
                          <label v-show="data.price_other && pic.hyPrice" style="display: inline-block;width:280px;"><span>会员</span>￥<label ng-bind="pic.hyPrice"></label></label>
                        </p>
                        <p class="original">
                          <span v-show="data.price_discount && pic.yjPrice" style="display: inline-block;width:240px;"><label><i></i>￥<label ng-bind="pic.yjPrice"></label></label></span>
                          <label v-show="data.price_wholesale && pic.pfPrice" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥<label ng-bind="pic.pfPrice"></label></label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="goods-price" v-show="data.price" style="font-size: 12px">￥<label ng-bind="pic.price"></label></p>
                </div>
                <div class="sales" v-if="data.css == 3">
                  <div class="goods-price">￥<label ng-bind="pic.price"></label></div>
                  <div class="goods-buy">我要抢购</div>
                </div>
              </a>
            </li>
          </ul>
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length<=0">
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
                <div class="photo-block">
                  <img src="images/69b0970572eb1ff21f919d265f4d1312.jpg">
                </div>
                <div v-if="data.css == 0 || data.css == 2">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                        </p>
                        <p class="original" >
                          <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
                <div class="sales" v-if="data.css == 3">
                  <div class="goods-price"><label>￥379.00</label></div>
                  <div class="goods-buy">我要抢购</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
                <div class="photo-block">
                  <img src="images/86551866bfc73cd54d4036f2248d3b06.jpg">
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                        </p>
                        <p class="original" >
                          <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
                <div class="sales" v-if="data.css == 3">
                  <div class="goods-price"><label>￥379.00</label></div>
                  <div class="goods-buy">我要抢购</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
                <div class="photo-block">
                  <img src="images/2811e55fde033b2f87294b2b9f92080c.jpg">
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                        </p>
                        <p class="original" >
                          <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
                <div class="sales" v-if="data.css == 3">
                  <div class="goods-price"><label>￥379.00</label></div>
                  <div class="goods-buy">我要抢购</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness',3:'rush'}[data.css]">
                <div class="photo-block">
                  <img src="images/2093f717f75f617bf551b63dd8bd4339.jpg">
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                        </p>
                        <p class="original" >
                          <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
                <div class="sales" v-if="data.css == 3">
                  <div class="goods-price"><label>￥379.00</label></div>
                  <div class="goods-buy">我要抢购</div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!--一大两小-->
        <div v-if="data.page==2" class="goods-card goods-card01">
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length>0">
            <li v-for="pic in picJson.imgID">
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block" style="height:100px;background:50% 50% no-repeat;background-size:contain;" :style="{'backgroundImage':'url('+pic.src+')'}">
                  <!-- <img :src="{{pic.src}}"> -->
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label" ng-bind="pic.pro_label"></span><span ng-bind="pic.title"></span></p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label ng-bind="pic.price"></label></p>

                    <div v-if="complete(_page)" style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price && pic.price" style="display: inline-block;width:240px;">￥<label ng-bind="pic.price"></label></label> <span class="original" v-show="data.price_discount && pic.yjPrice" style="display: inline-block;width:240px;"><label><i></i>￥<label ng-bind="pic.yjPrice"></label></label></span>
                          <label v-show="data.price_other && pic.hyPrice" style="display: inline-block;width:280px;"><span>会员</span>￥<label ng-bind="pic.hyPrice"></label></label> <label v-show="data.price_wholesale && pic.pfPrice" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥<label ng-bind="pic.pfPrice"></label></label>
                        </p>
                      </div>
                    </div>

                    <div v-if="!complete(_page)" style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price && pic.price" style="display: inline-block;width:240px;">￥<label ng-bind="pic.price"></label></label>
                          <label v-show="data.price_other && pic.hyPrice" style="display: inline-block;width:280px;"><span>会员</span>￥<label ng-bind="pic.hyPrice"></label></label>
                        </p>
                        <p class="original">
                          <span v-show="data.price_discount && pic.yjPrice" style="display: inline-block;width:240px;"><label><i></i>￥<label ng-bind="pic.yjPrice"></label></label></span>
                          <label v-show="data.price_wholesale && pic.pfPrice" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥<label ng-bind="pic.pfPrice"></label></label>
                        </p>
                      </div>
                    </div>

                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1">
                  <p class="simpleness-title" v-show="data.name" ng-bind="pic.title"></p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px">￥<label ng-bind="pic.price"></label></p>
                </div>
              </a>
            </li>
          </ul>
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length<=0">
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/69b0970572eb1ff21f919d265f4d1312.jpg">
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>

                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div class="list-scale">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label> <span class="original" v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label> <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price clearfix" :class="{'left-10':data.name}" v-if="data.css == 1">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/86551866bfc73cd54d4036f2248d3b06.jpg">
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                        </p>
                        <p class="original" >
                          <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="link clearfix" :class="{1:'simpleness'}[data.css]">
                <div class="photo-block">
                  <img src="images/2093f717f75f617bf551b63dd8bd4339.jpg">
                </div>
                <div v-if="data.css == 0">
                  <div class="clearfix  info-price" v-if="data.name || data.price">
                    <p class="goods-title" v-show="data.name"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                    <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                    <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                      <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                        <p class="goods-price" style="font-size: 35px">
                          <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                          <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                        </p>
                        <p class="original" >
                          <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                          <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;font-weight: bold;"><span>批发价</span>￥379.00</label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
                </div>
                <div class="simpleness-price" v-if="data.css == 1">
                  <p class="simpleness-title" v-show="data.name">此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price" style="font-size: 12px"><label>￥379.00</label></p>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!--详细列表-->
        <div v-if="data.page==3" class="goods-card goods-card04">
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length>0">
            <li v-for="pic in picJson.imgID" :class="{1:'simpleness'}[data.css]">
              <a href="javascript:void(0);" class="link clearfix">
                <div class="photo-block" >
                  <img :src="pic.src">
                </div>
                <div class="clearfix  info-price">
                  <p class="goods-title"><span class="goods-label" v-if="data.label && pic.pro_label" ng-bind="pic.pro_label"></span><span ng-bind="pic.title"></span></p>

                  <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale">￥<label ng-bind="pic.price"></label></p>
                  <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                    <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                      <p class="goods-price" style="font-size: 35px">
                        <label v-show="data.price && pic.price" style="display: inline-block;width:240px;">￥<label ng-bind="pic.price"></label></label>
                        <label v-show="data.price_other && pic.hyPrice" style="display: inline-block;width:280px;"><span>会员</span>￥<label ng-bind="pic.hyPrice"></label></label>
                      </p>
                      <p class="original">
                        <span v-show="data.price_discount && pic.yjPrice" style="display: inline-block;width:240px;"><label><i></i>￥<label ng-bind="pic.yjPrice"></label></label></span>
                        <label v-show="data.price_wholesale && pic.pfPrice" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥<label ng-bind="pic.pfPrice"></label></label>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
              </a>
            </li>
          </ul>
          <ul class="sc-goods-list clearfix" v-if="picJson.imgID.length<=0">
            <li  :class="{1:'simpleness'}[data.css]">
              <a href="javascript:void(0);" class="link clearfix">
                <div class="photo-block">
                  <img src="images/69b0970572eb1ff21f919d265f4d1312.jpg">
                </div>
                <div class="clearfix  info-price">
                  <p class="goods-title"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                  <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                    <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                      <p class="goods-price" style="font-size: 35px">
                        <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                        <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                      </p>
                      <p class="original" >
                        <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                        <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
              </a>
            </li>
            <li  :class="{1:'simpleness'}[data.css]">
              <a href="javascript:void(0);" class="link clearfix">
                <div class="photo-block">
                  <img src="images/86551866bfc73cd54d4036f2248d3b06.jpg">
                </div>
                <div class="clearfix  info-price">
                  <p class="goods-title"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                  <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                    <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                      <p class="goods-price" style="font-size: 35px">
                        <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                        <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                      </p>
                      <p class="original" >
                        <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                        <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
              </a>
            </li>
            <li  :class="{1:'simpleness'}[data.css]">
              <a href="javascript:void(0);" class="link clearfix">
                <div class="photo-block">
                  <img src="images/2811e55fde033b2f87294b2b9f92080c.jpg">
                </div>
                <div class="clearfix  info-price">
                  <p class="goods-title"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                  <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                    <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                      <p class="goods-price" style="font-size: 35px">
                        <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                        <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                      </p>
                      <p class="original" >
                        <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                        <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="good-buy" :class="{0:'btn1',1:'btn2',2:'btn3',3:'btn4'}[data.btnpage]" v-show="data.btn"></div>
              </a>
            </li>
            <li  :class="{1:'simpleness'}[data.css]">
              <a href="javascript:void(0);" class="link clearfix">
                <div class="photo-block">
                  <img src="images/2093f717f75f617bf551b63dd8bd4339.jpg">
                </div>
                <div class="clearfix  info-price">
                  <p class="goods-title"><span class="goods-label" v-if="data.label">爆</span>此处显示商品名称</p>
                  <p class="goods-price" v-show="data.price && !data.price_other && !data.price_discount && !data.price_wholesale"><label>￥379.00</label></p>
                  <div style="height:55px;overflow:hidden;" v-show="data.price_other || data.price_discount || data.price_wholesale">
                    <div style="position: relative;width: 540px;transform: scale(0.23148148148148148);transform-origin: left top;">
                      <p class="goods-price" style="font-size: 35px">
                        <label v-show="data.price" style="display: inline-block;width:240px;">￥379.00</label>
                        <label v-show="data.price_other" style="display: inline-block;width:280px;"><span>会员</span>￥379.00</label>
                      </p>
                      <p class="original" >
                        <span v-show="data.price_discount" style="display: inline-block;width:240px;"><label><i></i>￥379.00</label></span>
                        <label v-show="data.price_wholesale" style="display: inline-block;width:280px;color: #ff6600;"><span>批发价</span>￥379.00</label>
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
    </div>
</template>

<script>

	// import Lib from '@/assets/js/Lib';

	export default {
    name: 'CommodityList',
		data() {
			return {}
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
		methods: {}
	}

</script>

