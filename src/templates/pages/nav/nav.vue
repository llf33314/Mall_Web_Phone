<template>
  <div class="nav">
    <p>首页</p>
    <router-link to="/search">搜索(完成)</router-link>
    <router-link to="/classify">首页分类(完成)</router-link>
    <p>我的</p>
    <router-link to="/my">我的首页(完成)</router-link>
    <router-link to="/my/address">编译地址(完成)</router-link>
    <router-link to="/my/myAddress">我的地址(完成)</router-link>
    <p>订单</p>
    <a href="/views/order/index.html">我的订单(完成)</a> 
    <a href="/views/order/settlement.html">结算详情(完成)</a> 
    <a href="/views/order/order.html">订单详情(完成)</a> 
    <a href="/views/order/logistics.html">查看物流(完成)</a> 
    <p>商品</p>
    <router-link to="/goods">商品详情(差子路由样式)</router-link> 
    <router-link to="/goods/classify/0/29/42">商品列表(完成)</router-link>
    <p>购物车</p>
    <a href="/views/shoppingCart/index.html">购物车(完成)</a> 
    <p>拍卖</p>
    <a href="/views/auction/succeed.html">报名成功(完成)</a> 
    <a href="/views/auction/bond.html">提交保证金(完成)</a> 
    <a href="/views/auction/agreement.html">用户竞拍服务协议(完成)</a> 
    <p>批发</p>
    <a href="/views/wholesale/apply.html">批发申请(完成)</a> 
    <p>评论</p>
    <a href="/views/comment/comment.html">发表评论(完成,上传组件)</a> 
    <a href="/views/comment/succeed.html">评论成功(完成)</a> 
    <a href="/views/comment/share.html">评论分享(完成)</a> 
    <p>退款</p>
    <a href="/views/refund/apply.html">申请退款</a>
    <a href="/views/refund/refund.html">退款/售后(完成)</a>
    <a href="/views/refund/succeed.html">退款完成(完成)</a>
    <a href="/views/refund/consult.html">协商(完成)</a>
    <a href="/views/refund/logistics.html">物流信息（上传未完成）</a>
    <a href="/views/refund/classify.html">退款类型(完成)</a>
    <p>超级销售员</p>
    <a href="/views/sale/index.html">首页(完成)</a>
    <a href="/views/sale/apply.html">申请(完成)</a>
    <a href="/views/sale/index.html">商城设置(路由,自选没有写)</a>
  </div>
</template>

<script>

export default {
  name: 'nav',	

  data () {
    return {
      
    }
  },
  methods: {

  },
  mounted () {
    this.commonFn.setTitle('开发导航，上线删除');
  }
}
</script>

<style lang="less" scoped>
.nav{
  margin: 5% auto;
  width: 80%;
  font-size: 16px;
  a{
    margin-left: 10px;
    padding:5px ;
    display: block;
    color: #333;
  }
  p{
    font-size: 20px;
    font-weight: bold;
  }
}

</style>
