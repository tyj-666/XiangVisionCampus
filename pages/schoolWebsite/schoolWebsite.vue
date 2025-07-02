<template>
	<view>
		<web-view :src="schoolWebsite"></web-view>
	</view>
</template>

<script setup>
	import { ref} from 'vue';
	
	//引入生命周期函数
	import {onLoad} from "@dcloudio/uni-app";
	
	const schoolWebsite = ref();
	
	// 监听页面加载，接收参数
	onLoad(options => {
	  // options 是传递的参数对象
	  schoolWebsite.value = decodeURIComponent(options.schoolWebsite);
	  console.log('学校官网：',options.schoolWebsite)  //调试查看
	});
</script>

<style>
	       
</style>
