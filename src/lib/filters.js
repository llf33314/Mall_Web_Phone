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