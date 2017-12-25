
let cache = true;
if(window.hasOwnProperty('sessionStorage')){
  try {
    sessionStorage.setItem('gt','');
  }catch (error){
    cache = false;
  }
}else{
  cache = false;
}

var Rxports = {
	//http:window.location.origin,
  http: '/api',
  //http: '',
  //http:'http://192.168.2.191:8080/',
  shopId: "",
  cache: cache
};

export default Rxports;




















































