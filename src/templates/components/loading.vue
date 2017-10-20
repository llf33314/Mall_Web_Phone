<template>
	<div class="loading" v-show="isLoadingShow">
		<div class="loader">
			<div class="loader-inner ball-clip-rotate">
				<div></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['isLoadingShow'],
		mounted() {
			//console.log(this.isshow);
		}
	}
/*调用
this.$root.$emit('complete',true);//loading*/
</script>
<style scoped>
	.loading {
		width: 0.8rem;
		/*loading 总大小*/
		height: 0.8rem;
		/*loading 总大小*/
		position: absolute;
		top: 5rem;
		z-index: 100000000;
		margin-top: -0.5rem;
		left: 50%;
		margin-left: -0.4rem;
		text-align: center;
	}
	
	.ball-clip-rotate > div {
		background-color: rgb(76,165,254);
		width: 15px;
		height: 15px;
		border-radius: 100%;
		margin: 2px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		border: 2px solid rgb(76,165,254);
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