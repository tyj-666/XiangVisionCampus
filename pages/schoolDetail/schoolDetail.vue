<template>
	<view class="content">
		<!-- 返回图标 -->
		<up-navbar title="" :auto-back="true" bg-color="#00000000" left-icon-color="#000000"></up-navbar>

		<!-- 学校图片 -->
		<image :src="targetSchool.schoolImage" mode="aspectFill"></image>

		<view class="school-header">
			<view class="school-title">
				<!-- 学校名字 -->
				<view class="school-name">{{ targetSchool.schoolName }}</view>

				<!-- 学校标签-->
				<view class="school-tag">
					<view
						class="tag"
						v-for="(tag, index) in targetSchool.schoolTag"
						:key="index"
						:class="{
							'tag-211': tag === '211',
							'tag-985': tag === '985',
							'tag-double': tag === '双一流'
						}"
					>
						{{ tag }}
					</view>
				</view>

				<!-- 学校位置-->
				<view class="location">
					<text class="location-icon">📍</text>
					<text>{{ targetSchool.schoolLocation }}</text>
				</view>
			</view>

			<!-- 学校logo -->
			<view class="school-logo">
				<image :src="targetSchool.schoolLogo" mode="aspectFill"></image>
			</view>
		</view>

		<!-- 功能链接入口 -->
		<view class="function-entries">
			<!-- 学校官网 -->
			<view class="entry" @click="goLink(targetSchool.schoolWebsite)">
				<text class="entry-icon">🌐</text>
				<text>学校官网</text>
			</view>

			<!-- 学校VR -->
			<view class="entry" @click="goVR(targetSchool.vrUrl)">
				<text class="entry-icon">🎥</text>
				<text>VR全景</text>
			</view>

			<!-- 学校历年分数线 -->
			<view class="entry" @click="goScore(targetSchool.entranceScores)">
				<text class="entry-icon">🗺️</text>
				<text>学校历年分数线</text>
			</view>
		</view>

		<!-- 学校介绍  -->
		<view class="section" :class="{ expanded: introExpanded }" ref="introSection">
			<view class="section-header">
				<text class="title">学校介绍</text>
				<text class="toggle" @click="toggleIntro">
					{{ introExpanded ? '收起' : '展开' }}
					<text class="toggle-icon">{{ introExpanded ? '▲' : '▼' }}</text>
				</text>
			</view>
			<view class="section-content">
				<text>{{ targetSchool.schoolIntroduction }}</text>
			</view>
		</view>

		<!-- 学校历史 -->
		<view class="section" :class="{ expanded: historyExpanded }" ref="historySection">
			<view class="section-header">
				<text class="title">学校历史</text>
				<text class="toggle" @click="toggleHistory">
					{{ historyExpanded ? '收起' : '展开' }}
					<text class="toggle-icon">{{ historyExpanded ? '▲' : '▼' }}</text>
				</text>
			</view>
			<view class="section-content">
				<text>{{ targetSchool.schoolHistory }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
//引入api目录下的api.js
import { getSchoolDetail } from '../../api/api.js';
//引入生命周期函数
import { onLoad } from '@dcloudio/uni-app';

// 添加展开/收起状态管理
const introExpanded = ref(true);
const historyExpanded = ref(true);

const targetSchool = ref({}); // 接收其他页面传过来的某高校详情


//onLoad方法
onLoad((options) => {
	//拿所有高校详情的数据
	getSchoolDetail().then((res) => {
		const schoolId = Number(options.schoolId); // 转换为数字类型

		if (Array.isArray(res.data)) {
			// 使用 find 方法筛选匹配的学校对象
			targetSchool.value = res.data.find((item) => item.schoolId === schoolId);
		} else {
			//默认
			targetSchool.value = res.data.find((item) => item.schoolId === 8);
		}
		console.log('筛选结果：', targetSchool.value); // 调试输出
	});
});

// 切换展开/收起方法
const toggleIntro = () => {
	introExpanded.value = !introExpanded.value;
};

const toggleHistory = () => {
	historyExpanded.value = !historyExpanded.value;
};

//跳转到学校官网页
const goLink = (item) => {
	uni.navigateTo({
		url: `/pages/schoolWebsite/schoolWebsite?schoolWebsite=${item}`
	});
	console.log('跳转到学校官网页面成功');
};

//跳转到学校历年分数线页
const goScore = (item) => {
	uni.navigateTo({
		url: `/pages/entranceScores/entranceScores?entranceScores=${item}`
	});
	console.log('跳转到学校历年分数页面成功');
};

//跳转到VR地图页
const goVR = (item) => {
	uni.navigateTo({
		url: `/pages/vrMap/vrMap?vrUrl=${item}`
	});
	console.log('跳转到VR地图页面成功');
};

</script>

<style lang="scss">
.content {
	background-color: #f8f8f8;
	min-height: 100vh;

	image {
		width: 100%;
		height: 600rpx;
	}


	// 学校标题信息栏样式
	.school-header{
		display: flex;
		 flex-direction:row; /* 改为横向排列 */
		align-items: center; /* 垂直居中 */
		background-color: #fff;
		padding: 30rpx;

		.school-title {
			padding: 30rpx;
			width: 60%;

			.school-name {
				font-size: 40rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 20rpx;
			}

			.school-tag {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 20rpx;

				.tag {
					background-color: #f0f0f0;
					color: #666;
					font-size: 24rpx;
					padding: 6rpx 16rpx;
					border-radius: 30rpx;
					margin-right: 20rpx;
					margin-bottom: 10rpx;

					&.tag-211 {
						background-color: #c8f3f5; // 211标签颜色
					}

					&.tag-985 {
						background-color: #ffccc2; // 985标签颜色
					}

					&.tag-double {
						background-color: #b6f1bb; // 双一流标签颜色
					}
				}
			}

			.location {
				font-size: 28rpx;
				color: #666;

				.location-icon {
					margin-right: 10rpx;
				}
			}
		}
		.school-logo {
			width: 180rpx;
		    height: 180rpx;
		    border-radius: 50%;
		    overflow: hidden; /* 超出部分隐藏，确保圆形 */
		    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */

		    image {
				width: 100%;
		        height: 100%;
			}
		}
	}



	// 功能入口样式
	.function-entries {
		display: flex;
		margin-top: 20rpx;
		background-color: #fff;
		padding: 20rpx 0;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;

		.entry {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 20rpx 0;

			.entry-icon {
				font-size: 48rpx;
				color: #007aff;
				margin-bottom: 10rpx;
			}

			text {
				font-size: 26rpx;
				color: #333;
			}
		}
	}

	// 学校介绍和历史样式
	.section {
		background-color: #fff;
		margin-top: 20rpx;
		overflow: hidden;

		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #eee;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}

			.toggle,
			.more {
				font-size: 28rpx;
				color: #666;

				.toggle-icon,
				.more-icon {
					margin-left: 10rpx;
					font-size: 24rpx;
				}
			}
		}

		.section-content {
			padding: 30rpx;
			font-size: 28rpx;
			color: #666;
			line-height: 1.8;

			text {
				display: block;
			}
		}

		&:not(.expanded) .section-content {
			height: 80rpx;
			overflow: hidden;
		}
	}
}
</style>
