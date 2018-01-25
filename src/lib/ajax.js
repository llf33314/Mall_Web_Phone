import axios from 'axios';
import Vue from 'vue'

Vue.mixin({
    methods:{
        /**
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
      * @param {Function} error		    发送请求前
      * @param {Booleans} status		判断是否执行公用错误请求提示 false不使用 true使用  默认true使用
        @param {Booleans} loading		判断是否执行公用错误请求提示 false不使用 true使用  默认false不使用
        @param {Object} vmParent		this.$parent  避免组件
	  * @param return 
	*/
	ajaxRequest(opt) {
            let vm = this;
            let opts = opt || {};
            let status = opt.status || true;
            let vmParent = opt.vmParent || vm.$parent;
            if(typeof(opt.status) != 'undefined'){
                status = opt.status;
            }
            let loading = opt.loading || false;
            if (!opts.url) {
                alert('请填写接口地址');
                return false;
            }
            vm.$store.commit("is_show_loading",loading);//开启loading*/
            //配置请求头
            axios({
                "method": opts.type || 'post',
                "url": window.h5App.api + opts.url,
                "params": opts.data || {},
                "headers": {
                    "Content-type": "application/json;charset=UTF-8"
                },
                // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
                // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
                "timeout": opts.time || 30 * 1000,
                "responseType": opts.dataType || 'json'
            }).then(function (res) {
    
                if (res.status == 200) {
    
                    if (opts.success) {
                        // if(typeof(vmParent.$refs.loading) != "undefined"){
                        //     vm.$store.commit("is_show_loading",false);//关闭loading*/
                        // }
                        //1001 需要登陆（需要跳转）  1028会员卡购买跳转
                        if(res.data.code == 1001 || res.data.code == 1028){
                            location.href = res.data.url;
                            vm.$store.commit("is_show_loading",false);//关闭loading*/
                            return
                        }
                        //商家已过期（需要跳转）
                        if(res.data.code == 1004 || res.data.code == 1007){
                            let busId = vm.$route.params.busId || sessionStorage.getItem("busId") || 0;
                            vm.$router.push({path:"/error/404/"+busId}); 
                            vm.$store.commit("is_show_loading",false);//关闭loading*/
                            return
                        }
                        //链接已过期/模块已删除
                        if(res.data.code == 1025){
                            console.log(vm.$router)
                            let busId = vm.$route.params.busId || sessionStorage.getItem("busId") || 0;
                            vm.$router.push({path:"/error/url/"+busId});
                            vm.$store.commit("is_show_loading",false);//关闭loading*/
                            return;
                        }
                        //请求失败 1 请求数据为空1000  参数传值不完整1003
                        //商品已被删除或未上架1006  店铺已被删除1007 活动被删除1011
                        if(status){
                            if(res.data.code != 0 ){
                                let msg={
                                    type :'error',
                                    msg :  res.data.msg
                                }
                                vm.$store.commit("error_msg", msg);
                                if(typeof(vmParent.$refs.loading) != "undefined"){
                                    vm.$store.commit("is_show_loading",false);//关闭loading*/
                                }
                                return
                            }
                        }
                        opts.success(res.data, res);
                    }
    
                } else {
                    if(typeof(vmParent.$refs.loading) != "undefined"){
                        vm.$store.commit("is_show_loading",false);//关闭loading*/
                    }
                    if (data.error) {
                        opts.error(error);
                    } else {
                        console.log('error');
                    }
    
                }
    
            }).catch(function (error) {
                console.log(error,"------",opts.url);
                if (opts.error) {
                    opts.error(error);
                } else {
                    console.log('catch');
                    vm.$store.commit("error_msg", '请求超时请联系客服');
                    
                }
                if(typeof(vmParent.$refs.loading) != "undefined"){
                    vm.$store.commit("is_show_loading",false);//关闭loading*/
                }
            });
    
        },
    }
})