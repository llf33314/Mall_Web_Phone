<template>
	<div class="shop-wrapper">
		<div class="search-main">
            <header class="search-header">
                <div class="header-search">
                    <span class="fs42" @click="back()">取消</span>
                    <form action="#" @submit="inputFocus"> 
                        <input class="fs40"
                                type="text" 
                                v-model="keyWord"
                                placeholder="请输入商品关键词"
                                autofocus="autofocus"
                                id="input"/> 
                    </form>
                    <span class="fs42" @click="submit()">搜索</span>
                </div>
            </header>
            <section class="search-content">
                <div class="search-history" v-if="keywordList">
                    <p class="search-title">
                        <i class="fs36">历史搜索</i>
                        <i class="iconfont icon-shanchu"
                            @click="clearSearchAjax">
                        </i>
                    </p>
                    <div class="search-txt">
                        <em class="em-search" v-for=" item in keywordList"
                        @click="submit(item.keyword)">
                            {{item.keyword}}
                        </em>
                    </div>
                </div>
                <div class="search-history">
                    <p class="search-title">
                        <i class="fs36">搜索推荐</i>
                    </p>
                    <div class="search-txt">
                        <em class="em-search" v-for=" item in labelList"
                            @click="submit(item.group_name)">
                            {{item.group_name}}
                        </em>
                    </div>
                </div>
           </section>
      </div>
	</div>
</template>

<script>

export default {
  data() {
    return {
        labelList:[],
        keywordList:null,
        keyWord:''
    }
  },
  
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){
  	
  	
  },  
  //在挂载开始之前被调用
  beforeMount(){
  	
  
  }, 
  //相关操作事件
  methods: {
	/**
     * 搜索页数据请求
     */
    searchAjax(){
        let _this = this;
        this.ajaxRequest({
            'url': h5App.activeAPI.phonePage_searchLabel_post,
            'data':{
                shopId : this.$store.state.shopId
            },
            'success':function(data){
                console.log(data)
                _this.labelList = data.data.labelList;
                _this.keywordList = data.data.keywordList;
            }
        })
    },
    /** 
     * 焦点时间
     */
    inputFocus(){

    },
    /** 
     * 确定
     */
    submit(data){
        let type = this.$route.params.type || 0;//活动类型
        let shopId = this.$store.state.shopId || 'shopId';//店铺id
        let busId = this.$store.state.busId || 'busId';//店铺id
        let keyword =  data || this.keyWord || 'k=k';//搜索关键词

        this.$store.commit('mutationData',{keywords:keyword});
        let url = '/classify/'+shopId+'/'+busId+'/'+type+'/'+keyword;
        let desc = this.$route.params.desc;
        if(this.commonFn.isNotNull(desc)){
            url += "/"+desc;
        }
        this.$router.push(url)
    },
    /** 
     * 取消
     */
    back(){
        window.history.go(-1)
    },
    /** 
    * 清空历史搜索接口
    */
    clearSearchAjax(){
        let _this = this;
        let msg = {
            'btnNum': '2',
            'dialogTitle':'提示',
            'dialogMsg': '确定清空历史搜索吗？',
            'btnOne': '是',
            'btnTow': '否',
            'callback': {
                'btnOne': function () {
                    _this.ajaxRequest({
                        'status':false,
                        'url': h5App.activeAPI.phonePage_clearSearchGroup_post,
                        'data':{
                            shopId : _this.$store.state.shopId
                        },
                        'success':function(data){
                            if(data.code == 0){ //code 1  清空成功
                                _this.keywordList = null
                            }else{
                                _this.$parent.$refs.bubble.show_tips('清空失败');//bubble_hint*/
                            }
                        }
                    })
                },
                'btnTow': function () {

                }
            }
        };
        _this.$parent.$refs.dialog.showDialog(msg);//user_dialog
    }
  },
  //已成功挂载，相当ready()
  mounted(){
    this.commonFn.setTitle('搜索');
    this.searchAjax();

    let _keyword = this.$store.state.keywords || this.$route.params.keywords;
    _keyword === 'k=k'?this.keyWord = '':this.keyWord = _keyword || '';
    this.$parent.getSaleMemberId();
    
    $('#input').focus();
  },
}
</script>

<style lang="less">
@import '../../../assets/css/mixins.less';
@import '../../../assets/css/base.less';
.search-main{
    width: 100%;
    position: relative;
    .search-header{
        width: 100%;
        font-size: 0;
        background: #fff;
    }
    .header-search{
        width: 100%;
        padding: 25/@dev-Width *1rem ;
        padding-right: 0;
        position: relative;
        form{
            width: 76%;
            display: inline-block;
        }
        input{
			background: #ebebeb;
            width: 100%;
            border: 0;
            padding: 20/@dev-Width *1rem;
            padding-right: 0;
            .border-radius(10px);
        }
        &>span{
                width: 12%;
                display: inline-block;
                text-align: center;
                padding: 20/@dev-Width *1rem 0;
            }
    }
    .search-content{
        width: 100%;
        .search-history{
            width: 100%;
            .search-title{
                width: 100%;
                .ik-box;
                .ik-box-pack(justify);
                i{
                    padding: 40/@dev-Width *1rem;
                    display: block;
                }
            }
            .search-txt{
                width: 100%;
                padding: 0 40/@dev-Width *1rem ;
                font-size: 0;
            }
        }
    }
}

</style>
