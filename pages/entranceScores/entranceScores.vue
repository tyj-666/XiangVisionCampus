<template>
	<view>
		<web-view :src="entranceScores"></web-view>
	</view>
</template>

<script setup>
	import { ref} from 'vue';
	
	//引入生命周期函数
	import {onLoad} from "@dcloudio/uni-app";
	
	const entranceScores = ref();
	
	// 监听页面加载，接收参数
	onLoad(options => {
	  // options 是传递的参数对象
	  entranceScores.value = decodeURIComponent(options.entranceScores);
	  console.log('学校历年分数线网址：',options.entranceScores)  //调试查看
	});
</script>

<style>
	       
</style>
