<template>
	<view>
		<web-view :src="vrUrl"></web-view>
	</view>
</template>

<script setup>
	import { ref} from 'vue';
	
	//引入生命周期函数
	import {onLoad} from "@dcloudio/uni-app";
	
	const vrUrl = ref();
	
	// 监听页面加载，接收参数
	onLoad(options => {
	  // options 是传递的参数对象
	  vrUrl.value = decodeURIComponent(options.vrUrl);
	  console.log('学校VR全景网址：',options.vrUrl)  //调试查看
	});
</script>

<style>
	       
</style>
