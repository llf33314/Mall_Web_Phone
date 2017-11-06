import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/** 获取使用方法 
 * dom里 $store.state.xxx
 * vue里 this.$store.state.xxx
 * 改变状态 要用 mutations 里的方法
 * this.$store.commit('mutationData',{loginDTO_URL:window.location.href});
*/
// 存储状态值
const state = {
    app_name : '多粉商城',
    shopId: '',
    busId: '',
    keywords: '',
    type:'',
    loginDTO_URL:'',//浏览器地址
    browerType:'',//浏览器类型 1 微信 ， 99 浏览器	必传
    showTop:1,//置顶按钮显示
    showfooter:1,//底部导航显示隐藏
    isAdvert:'',//是否显示技术支持
}

const actions ={
    
}

// 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
const getters = {

}

// 状态值的改变方法,操作状态值, 提交mutations是更改Vuex状态的唯一方法
const mutations = {
    mutationData:(state,data) => {
        state.shopId =  data.shopId ||state.shopId;
        state.busId =  data.busId ||state.busId;
        state.browerType =  data.browerType ||state.browerType;
        state.keywords =  data.keywords || state.keywords;
        state.loginDTO_URL =  data.loginDTO_URL || state.loginDTO_URL;
    },
    show_top:(state,Booleans)=>state.showTop =  Booleans,
    show_footer:(state,Booleans)=>state.showfooter =  Booleans,
    is_Advert:(state,number)=>state.isAdvert = number,
    goods_details:(state,data)=>state.goodsdetails = data,
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
  })

  
// export default new Vuex.Store({
//     state
// });