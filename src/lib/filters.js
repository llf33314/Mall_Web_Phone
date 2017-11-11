import Vue from 'vue'

//四舍五入保留2位小数（不够位数，则用0替补）
Vue.filter("currency",function(value){
    let result = parseFloat(value);
    if (isNaN(value)) {
        console.log('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(value * 100) / 100;
    let s_x = result.toString();
    let pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
});

/**
 * 时间戳转换日期（有时分秒）  
 * @param date 时间戳  
 */
Vue.filter('format',(value)=>{
    let add0 = (m) => m<10?'0'+m:m;
    //时间轴是整数，否则要parseInt转换
    let time = new Date(value);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
});

/**
 * 时间戳转换日期（无时分秒）  
 * @param date 时间戳  
 */
Vue.filter('formatNot',(value)=>{
    let add0 = (m) => m<10?'0'+m:m;
    //shijianchuo是整数，否则要parseInt转换
    let time = new Date(value);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    return y+'-'+add0(m)+'-'+add0(d);
})
/**
     * 价格分割正数位
     * @param money 标题
     */
Vue.filter('moneySplit1',(money)=>{
    let arr = [];
    let str = money+"";
    
    if(str.indexOf(".")==-1){
        arr = [money,'00'];
    }else{
        arr = str.split('.');
    }
    arr[0] = parseFloat(arr[0] ).toLocaleString();
    return arr[0]
})
/**
     * 价格分割小数位
     * @param money 标题
     */
    Vue.filter('moneySplit2',(money)=>{
        let arr = [];
        let str = money+"";
        
        if(str.indexOf(".")==-1){
            arr = [money,'00'];
        }else{
            arr = str.split('.');
        }
        arr[0] = parseFloat(arr[0] ).toLocaleString();
        return arr[1]
    })