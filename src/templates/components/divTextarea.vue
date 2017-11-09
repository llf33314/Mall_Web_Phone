<template>
    <div class="table fs42" contenteditable="true"
        v-text="newText"
        placeholder="选填"
        @click="table_focus"
        @blur="table_blur($event)">
    </div>
</template>
<script>

export default {
    props:['text'],
    data: function () {
        return {
            newText:''
        }
    },
    mounted() {
        this.newText = this.text;
    },
    methods: {
        table_focus(){
            this.newText = '';
        },
        table_blur(e){
            var nowText = $(e.target).html();//输入的内容
            if(nowText.length <= 0 || nowText.length === '<br>'){
                this.newText = this.text;
            }else{
                this.newText = nowText;
                this.$emit('newText',nowText);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/mixins.less';
@import '../../assets/css/base.less';

.table{
    width: 98%;
    height: 200%;
    border: 0;
    outline: 0;
    word-wrap: break-word;
    border: 1px solid #ddd;
}

</style>
