<template>
  <section class="goods-info">
        <div class="goods-top " :class="[ type == 4 ?'border':'']">
            <div class="goods-info-name">
                <em class="em-tag" v-if="goodsData.productLabel">{{goodsData.productLabel}}</em>
                <span class="fs42">{{goodsData.productName}}</span>
            </div>
            <div class="fs40  goods-info-other">
                <div class="style-main-font" v-if="type != 5">
                    <span v-if=" type== 3">秒杀价</span>
                    <span v-else-if="type== 1">团购价: ￥<span class="fs50" v-if="goodsData.groupPrice > 0">{{goodsData.groupPrice | moneySplit1}}</span>.{{goodsData.groupPrice | currency |moneySplit2}}</span>
                    <span v-else-if="type== 4">当前价:</span>
                    <span v-else-if="type== 4 && goodsData.auctionResult.isWin == 1">出价{{goodsData.auctionResult.auctionNumber}}次</span>
                    <span v-else-if="type== 6">预售价:</span>
                    <span class="fs50" v-else-if="type== 5">
                        {{goodsData.productPrice | moneySplit1}}.{{goodsData.productPrice | currency | moneySplit2}}粉币
                    </span>
                    <span v-else >价格:</span>
                    <span v-if="type != 1">
                    ￥<span class="fs50" v-if="goodsData.productPrice > 0">{{goodsData.productPrice | moneySplit1}}</span>.{{goodsData.productPrice | currency |moneySplit2}}
                    </span>
                    <span v-if="type== 7">批发价：￥{{goodsData.pfPrice}}</span>
                    <span class="shopGray" v-if="goodsData.auctionResult >= 0 ">抢拍{{goodsData.auctionResult.auctionNumber}}次</span>
                    <span v-if="goodsData.isShowCommission == 1 && goodsData.commissionMoney > 0">
                        <span >佣金：</span>
                        ￥<span class="fs50">{{goodsData.commissionMoney | moneySplit1 }}</span>.{{goodsData.commissionMoney | currency | moneySplit2}}
                    </span>
                </div>
                <span class="fs50 style-main-font" v-else>{{goodsData.productPrice | moneySplit1}}.{{goodsData.productPrice | currency | moneySplit2}} 粉币</span>
                <count-down :times="goodsData.activityTimes" :countBg="'style-middle-bg'"></count-down>
            </div>
            <div class="fs40  goods-info-other" v-if=" type == 4 || type == 7 || type == 6">
                <div v-if="type == 7 " class="shopGray">
                    <!-- 原价<del>￥{{goodsData.productCostPrice}}</del> -->
                    <span class="style-main-font" v-if="goodsData.hyPrice > 0"> 会员价：￥{{goodsData.hyPrice}}</span>
                </div>
                <!----拍卖进行中---->
                <div v-if="type == 4">
                    <div class="style-main-font" v-if="goodsData.auctionResult.isWin < 0 && goodsData.auctionResult.depositMoney > 0">
                        <span >保证金：</span>
                        ￥<span class="fs50">{{goodsData.auctionResult.depositMoney | moneySplit1 }}</span>.{{goodsData.auctionResult.depositMoney | currency | moneySplit2}}
                        <span class="shopGray">不成拍卖后退还</span>
                    </div>
                    <!----拍卖胜出------>
                    <div class="shopGray" v-if="goodsData.activityStatus == -1">
                        <p class="shop-box-center fs36">
                            <span class="style-main-font shop-show" v-if="goodsData.auctionResult.isWin == 1">恭喜！您已胜出！</span>
                            <span class="style-main-font shop-show" v-else>恭喜！您已胜出！</span>
                            <span class="shop-show">关注量:{{goodsData.attentionNum}}</span>
                        </p>
                        <p class="shopGray " style="font-size:12px">请在24小时内提交订单：若在24小时内未提交订单，系统将自动关闭交易并扣除您的 保证用于赔付送拍机构金</p>
                    </div>
                    <div class="fs36 shopGray" v-if="goodsData.auctionResult.isWin != 1">{{goodsData.auctionResult.marginNumber}}人已报名</div>
                </div>
                <div v-if="type == 6 && goodsData.presaleResult != null">
                    <div class="style-main-font" v-if="goodsData.presaleResult.dingMoney > 0">
                        <span >{{goodsData.presaleResult.payDespositStatus == 0 ? "定金" : "定金已付"}}：</span>
                        ￥<span class="fs50">{{goodsData.presaleResult.dingMoney | moneySplit1 }}</span>.{{goodsData.presaleResult.dingMoney | currency | moneySplit2}}
                    </div>
                    <div class="style-main-font" v-if="goodsData.presaleResult.payDespositStatus == 1 && goodsData.presaleResult.weiMoney > 0">
                        <span >尾款应付：</span>
                        ￥<span class="fs50">{{goodsData.presaleResult.weiMoney | moneySplit1 }}</span>.{{goodsData.presaleResult.weiMoney | currency | moneySplit2}}
                    </div>
                </div>
            </div>
            <p class="goods-info-other fs40 shopGray" v-if="type != 4">
                <span v-if="type != 0 && type != 7 ">
                    <del>￥{{goodsData.productCostPrice}}</del>
                </span>
                <span v-if="type == 0 || type == 7 ">
                    运费: ￥{{goodsData.freightMoney}}
                </span>
                <span v-if="type == 0 || type == 7 ">
                    库存:{{goodsData.productStockTotal}}
                </span>
                <span v-if="type == 7 ">
                    关注量:{{goodsData.attentionNum}}
                </span>
                <span>
                    销量:{{goodsData.productSaleTotal}}
                </span>
            </p>
        </div>
        <div class="goods-bottom shopGray" v-if=" type ==4 ">
            <p class="fs40 ">
                <span>起拍价：￥{{goodsData.auctionResult.aucStartPrice}}</span>
                <span v-if="goodsData.auctionResult.aucLowestPrice>=0">保留价：￥{{goodsData.auctionResult.aucLowestPrice}}</span>
                <span v-if="goodsData.auctionResult.aucLowestPrice>=0 && goodsData.auctionResult.depositMoney > 0">保证金：￥{{goodsData.auctionResult.depositMoney}}</span>
            </p>
            <p class="fs40 ">
                <span v-if="goodsData.auctionResult.aucType == 2 ">加价幅度：￥{{goodsData.auctionResult.aucAddPrice}}</span>
                <span v-if="goodsData.auctionResult.aucType == 1 ">降价幅度：每{{goodsData.auctionResult.aucLowerPriceTime}}分钟降价
                    ￥{{goodsData.auctionResult.aucLowerPrice}}
                </span>
            </p>
            <p class="fs40 ">
                <span >拍卖方式：{{goodsData.auctionResult.aucTypeVal}}</span>
            </p>
            <p class="fs40 ">
                <span >服务支持：支持7天无理由退货</span>
            </p>
        </div>
    </section>
</template>

<script>
import countDown from "../../home/classify_child/countDown"; //倒计时

export default {
  props: ["row", "types"],

  components: {
    countDown
  },
  watch: {
    row(a, b) {
      this.goodsData = this.row;
      console.log(a, b, "aabb");
    },
    types(a, b) {
      if (a != b) {
        this.type = this.types;
      }
    }
  },
  data() {
    return {
      type: 0,
      goodsData: {
        auctionResult: {
          isWin: 0
        }
      }
    };
  },
  methods: {},
  mounted() {
    console.log("goods-info-other", this.goodsData, this.row);
  }
};
</script>

<style>

</style>
