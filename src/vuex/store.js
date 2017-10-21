import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 存储状态值
const state = {
    app_name : '多粉商城',
    shopId:'',
    busId:'',
    loginDTO:{
        url:'',//当前页面地址
        browerType:'',//浏览器类型 1 微信 ， 99 浏览器	必传
    },
    showTop:true,//置顶按钮显示
    showfooter:true,//底部导航显示隐藏
}

const actions ={
    
}

// 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
const getters = {

}

// 状态值的改变方法,操作状态值, 提交mutations是更改Vuex状态的唯一方法
const mutations = {
    mutationData:(state,data) => {
        state.shopId =  data.shopId;
        state.busId =  data.busId;
        state.loginDTO =  data.loginDTO;
    },
    show_top:(state,Booleans)=>state.showTop = Booleans,
    show_footer:(state,Booleans)=>state.showfooter = Booleans,
    loginDTO_URL:(state,url)=>state.loginDTO.url = url
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
  })

  
// export default new Vuex.Store({
//     state
// });