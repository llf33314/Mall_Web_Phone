<template>
</template>
<script>
import { map } from "components/gt-ui/index.js";
import { Popup } from "mint-ui";
export default {
  name: "mapAddress",
  props: ["type", "lat", "lng", "memAddress"],
  data: function() {
    return {
      list: [],
      isShowDialog: false,
      data: {},
      isShow: true,
      lats: this.lat,
      lngs: this.lng
    };
  },
  components: {
    Popup
  },
  mounted() {
    let _this = this;
    let types = this.type;
    let _isNull = this.commonFn.isNull;
    if (types == 1) {
      if (this.lats == 0 || this.lngs == 0) {
        this.getLngByAddress(this.memAddress);
        return;
      }
      this.showMaps();
    } else if (types == 2) {
      this.getLngByAddress(this.memAddress);
    }
  },
  methods: {
    showMaps() {
      let _this = this;
      if (this.lats == 0 || this.lngs == 0) {
        this.getLngByAddress(this.memAddress);
        return;
      }
      map.show
        .call(this, {
          lat: this.lats,
          lng: this.lngs
        })
        .then(function(e) {
          _this.$emit("confirmMap", [_this.type, e]);
          _this.$emit("update:isShow", false);
        });
    },
    getLngByAddress(_address) {
      let data = {};
      let address = _address;
      let addressObj = this.addressObj;
      let _isNull = this.commonFn.isNull;
      let _this = this;
      if (_isNull(_address)) {
        _this.$emit("update:isShow", false);
        return;
      }
      console.log("---");
      data.output = "jsonp";
      data.address = address;
      data.key = "2VBBZ-A3C3O-E7XW7-S6RWA-Q676Z-O6FGU";
      $.ajax({
        type: "get",
        dataType: "jsonp",
        data: data,
        jsonp: "callback",
        url: "https://apis.map.qq.com/ws/geocoder/v1",
        jsonpCallback: "QQmap",
        success: function(json) {
          console.log(json, "json");
          if (json.status == 0) {
            // addressObj.memLongitude = json.result.location.lng;
            // addressObj.memLatitude = json.result.location.lat;
            if (_this.type == 1) {
              _this.lats = json.result.location.lat;
              _this.lngs = json.result.location.lng;
              debugger;
              _this.showMaps();
            } else if (_this.type == 2) {
              _this.$emit("confirmMap", [_this.type, json.result]);
              _this.$emit("update:isShow", false);
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>

 </style>

 