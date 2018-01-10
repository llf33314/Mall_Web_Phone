<template>
    <div>
      <div class="couponModule">
        <div style="width: 960px;transform: scale(0.333333);transform-origin: left top;">
          <div class="coupon-list bg-cover">
            <div class="coupon-list-t">
              <div class="coupon-list-t-l bg-cover" style="background-image: url(../../../../../assets/images/coupon_bg02.jpg)"></div>
              <div class="coupon-list-t-r">
                <div class="coupon-list-t-r-name">优惠券名称</div>
                <div class="coupon-list-t-r-price">9.8<span>折</span></div>
                <div class="coupon-list-t-r-time">2017.07.07-2017.07.08</div>
              </div>
            </div>
            <div class="coupon-list-fgx"></div>
            <div>
              <div class="coupon-list-btn">立即领取</div>
            </div>
          </div>

          <div class="coupon-list bg-cover">
            <div class="coupon-list-t">
              <div class="coupon-list-t-l bg-cover" style="background-image: url(../../../../../assets/images/coupon_bg02.jpg)"></div>
              <div class="coupon-list-t-r">
                <div class="coupon-list-t-r-name">优惠券名称</div>
                <div class="coupon-list-t-r-price">9.8<span>折</span></div>
                <div class="coupon-list-t-r-time">2017.07.07-2017.07.08</div>
              </div>
            </div>
            <div class="coupon-list-fgx"></div>
            <div>
              <div class="coupon-list-btn">立即领取</div>
            </div>
          </div>

          <div class="coupon-list bg-cover">
            <div class="coupon-list-t">
              <div class="coupon-list-t-l bg-cover" style="background-image: url(../../../../../assets/images/coupon_bg02.jpg)"></div>
              <div class="coupon-list-t-r">
                <div class="coupon-list-t-r-name">优惠券名称</div>
                <div class="coupon-list-t-r-price">9.8<span>折</span></div>
                <div class="coupon-list-t-r-time">2017.07.07-2017.07.08</div>
              </div>
            </div>
            <div class="coupon-list-fgx"></div>
            <div>
              <div class="coupon-list-btn">立即领取</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

	

	export default {
    name: 'Coupon',
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

