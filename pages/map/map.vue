<template>
	<view class="content">
		<!--地图 -->
		<view>
			<map
				style="width: 100%; height: 100vh"
				id="map"
				scale="9"
				layer-style="1"
				:markers="schoolLocation"
				longitude="112.952856"
				latitude="27.644106"
				@markertap="goSchoolDetail"
			></map>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
//引入api目录下的api.js
import { getSchoolLoaction } from '../../api/api.js';
//引入生命周期函数
import { onLoad } from '@dcloudio/uni-app';

const schoolLocation = ref({}); // 获取高校数据

//onLoad方法
onLoad(() => {
	//拿高校位置的数据
	getSchoolLoaction().then((res) => {
		console.log('获取的res：', res); //调试查看
		schoolLocation.value=res.data
		
		const newList = res.data.map((item) => ({
			id: Number(item.schoolId), // 确保 id 为数字
			width:50,
			height: 50,
			iconPath: item.schoolLogo, // 图标路径
			longitude: Number(item.longitude), // 确保经纬度为数字
			latitude: Number(item.latitude)
		}));
		schoolLocation.value = newList; // 更新响应式数据
		
		console.log('标点信息：', schoolLocation.value); //调试查看
	});
});

// 点击标点跳转到学校详情页
const goSchoolDetail = (event) => {
	// console.log();
	uni.navigateTo({
		url: `/pages/schoolDetail/schoolDetail?schoolId=${event.markerId}`
	});
	console.log('点击的标记点 ID:', event.markerId,'跳转到学校详情页面成功');
};

</script>

<style></style>
