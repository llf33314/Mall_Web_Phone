<template>
  <mt-popup v-model="visible" position="bottom" class="mint-datetime">
        <mt-picker
          :slots="numberSlot"
          ref="picker"
          @change="onValuesChange"
          :visible-item-count="visibleItemCount"
          show-toolbar>
          <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false;$emit('cancel')">{{ cancelText }}</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{ confirmText }}</span>
        </mt-picker>
  </mt-popup>
</template>
<script>
  export default {
    name: 'pickerCustom',
    props: {
      value: [String, Number],
      numberSlot: Array,
      visibleItemCount: {
        type: Number,
        default: 7
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      }
    },
    watch:{
      value(val){
        this.currentValue = val;
      },
      currentValue(val){
        this.$emit('input',val);
      }
    },
    data() {
      return {
        visible: false,
        currentValue: "",
      }
    },
    mounted() {
      if (this.value) {
        this.currentValue = this.value;
      }else{
        let numberSlot = this.numberSlot[0];
        this.currentValue = numberSlot.values[numberSlot.defaultIndex];
      }
      this.$refs.picker.setSlotValue(0,this.currentValue);
    },
    methods: {
      onValuesChange(o,val){
        this.currentValue = val[0];
      },
      open(){
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      confirm() {
        this.visible = false;
        this.$emit('confirm', this.currentValue);
      },
    }
  };
</script>
