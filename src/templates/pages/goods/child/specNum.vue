<template>
    <div class="goods-choice-box2">
        <em class="em-choice" @click="addSpec_number('-')">-</em>
        <input class="em-choice" v-model="num"></input>
        <em class="em-choice" @click="addSpec_number('+')">+</em>
    </div>
</template>

<script>


export default {
    props: {
        prop:{
            type: Object,
            default: 'default'
        },
        type:{
            type: String,
            default:'default'
        },
        maxBuyNum:{
            type: Number,
            default: 'default'
        }
    },
    watch: {
        'num'(a,b){
            console.log(a,b);
            if(this.type == 'wholesale'){
                let newObj;
                newObj={
                    specificaValueIds:this.prop.specifica_ids.toString(),
                    productNum:a,
                }   
                console.log(newObj)
            }else{
                this.$emit("dialognum",a);
            }
        },
    },
    data () {
        return {
            num:1
        }
    },
    methods: {
    /** 
     * 规格数量加减
     */
    addSpec_number(e){
        let _this =this;
        if( e === '-'){//减小时，
            if(_this.prop.productNum<=1){
                 _this.$parent.$parent.$refs.bubble.show_tips('数量不能小于1');
                return
            }
            _this.num --;
        }else{//增减时
            // 限购数量不为零时，购买数量不能超出限购数量
            if(_this.maxBuyNum && (_this.prop.productNum >= _this.maxBuyNum)){
                _this.$parent.$parent.$refs.bubble.show_tips('超出限购数量');
                return
            }
            //超出规格库存
            if(_this.prop.productNum >= _this.prop.inv_num){
                 _this.$parent.$parent.$refs.bubble.show_tips('超出现有库存量');
                 return
            }
            _this.num ++;
        }
        _this.prop.productNum = _this.num;
    },
  },
  mounted () {
      console.log(this.prop,'prop');
      console.log(this.maxBuyNum,'maxBuyNum');
      this.num = this.prop.productNum; 
  }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
@import '../../../../assets/css/base.less';
.goods-choice-box2{
    em,input{
        padding: 0;
        line-height: 90/ @dev-Width *1rem;
        color: #87858f;
        width: 98/ @dev-Width *1rem;
        height: 90/ @dev-Width *1rem;
        text-align: center;
        margin-right: 2px;
        .border-radius(0);
        font-weight: bold;
        font-size: 68/ @dev-Width *1rem;
        vertical-align: top;
    }
    &>em:first-of-type{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    input{
        font-size: 40/ @dev-Width *1rem;
        font-weight:normal;
        color: #333;
        width: 128/ @dev-Width *1rem;
        border: 0;
        margin-right: 2px;
    }
    &>em:last-of-type{
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
}
</style>
