<template>
	<div class="loading-box" v-show="$store.state.isShowLoading">
		<div class="loading" >
			<div class="loader">
				<div class="loader-inner ball-clip-rotate">
					<div></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				isLoadingShow:false
			}
		},
		mounted() {
			//console.log(this.isshow);
		},
		methods: {
			show(show){
				this.isLoadingShow = show;
			}
		}
	}
/*调用
this.$root.$emit('complete',true);//loading*/
</script>
<style scoped>
	.loading-box{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left: 0;
		z-index: 9999;
	}
	.loading {
		width: 1.2rem;
		/*loading 总大小*/
		height: 1.2rem;
		/*loading 总大小*/
		position: absolute;
		top: 5rem;
		z-index: 100000000;
		margin-top: -0.5rem;
		left: 50%;
		margin-left: -0.4rem;
		text-align: center;
		background: rgba(0, 0, 0, 0.25);
		border-radius:5px;
	}
	
	.ball-clip-rotate > div {
		background-color: #fff;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		margin: 10px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		border: 2px solid #fff;
		border-bottom-color: transparent;
		height: 25px;
		width: 25px;
		background: transparent !important;
		display: inline-block;
		-webkit-animation: rotate 0.75s 0s linear infinite;
		animation: rotate 0.75s 0s linear infinite;
	}
	
	@keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg) ;
			transform: rotate(0deg) ;
		}
		50% {
			-webkit-transform: rotate(180deg) ;
			transform: rotate(180deg) ;
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg) ;
		}
	}
	
</style>