<template>
	<view class="search-container">
		<!-- 搜索区域 -->
		<view class="search-bar">
			<up-icon name="search" @click="clearSearch" size="20px" style="margin-right: 10rpx"></up-icon>
			<input class="search-input" type="text" placeholder="请输入学校名称" v-model="searchText" confirm-type="search" />

			<up-icon name="close" v-if="searchText" @click="clearSearch" size="20px" style="margin-right: 10rpx"></up-icon>
		</view>

		<!-- 筛选区域 -->
		<view class="filter-row">
			<picker mode="selector" :range="cityData" range-key="name" @change="handleCityChange" :value="cityIndex">
				<view class="filter-picker">
					{{ selectedCity || '选择城市' }}
					<up-icon name="arrow-down" @click="clearSearch" size="18px" style="margin-left: 10rpx"></up-icon>
				</view>
			</picker>
		</view>

		<!-- 学校列表 -->
		<view class="university-grid">
			<view class="university-card" v-for="item in filteredList" :key="item.schoolId" @click="handleUniversityClick(item)">
				<view class="image-container">
					<image :src="item.schoolImage" lazy-load mode="aspectFill" class="university-image" />
				</view>
				<view class="university-name">{{ item.schoolName }}</view>
				<view class="university-info">
					<view class="location">{{ item.schoolLocation }}</view>
					<view class="label-container">
						<view
							class="label-tag"
							v-for="(tag, tagIndex) in item.schoolTag"
							:key="tagIndex"
							:class="{
								'tag-211': tag === '211',
								'tag-985': tag === '985',
								'tag-double': tag === '双一流'
							}"
						>
							{{ tag }}
						</view>
					</view>
				</view>
			</view>

			<view class="no-result" v-if="filteredList.length === 0">
				<up-icon name="error-circle" @click="clearSearch" size="50px" style="margin-bottom: 20rpx;margin-top: 100rpx;line-height: 50vh;"></up-icon>
				<text>暂无搜索结果</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getSchoolDetail } from '../../api/api.js';
import { onLoad } from '@dcloudio/uni-app';

// 搜索文本
const searchText = ref('');

// 城市数据
const cityData = ref([{ name: '全部城市' }, { name: '湖南省长沙市' }, { name: '湖南省衡阳市' }, { name: '湖南省湘潭市' }, { name: '湖南省株洲市' }]);

// 当前选中的城市索引
const cityIndex = ref(0);
// 选中的城市
const selectedCity = ref('');
// 原始大学列表
const universityList = ref([]);

// 生命周期：加载数据
onLoad(() => {
	getSchoolDetail().then((res) => {
		console.log('所有学校数据：', res.data);
		universityList.value = res.data;
	});
});

// 过滤后的列表
const filteredList = computed(() => {
	return universityList.value.filter((item) => {
		// 匹配搜索文本（使用schoolName字段）
		const nameMatch = item.schoolName.includes(searchText.value);
		// 匹配城市（使用schoolLocation字段）
		const cityMatch = !selectedCity.value || selectedCity.value === '全部城市' || item.schoolLocation === selectedCity.value;

		return nameMatch && cityMatch;
	});
});


// 处理城市选择变化
const handleCityChange = (e) => {
	cityIndex.value = e.detail.value;
	selectedCity.value = cityIndex.value === 0 ? '' : cityData.value[cityIndex.value].name;
};

// 清空搜索
const clearSearch = () => {
	searchText.value = '';
};

// 点击学校卡片跳转到详情页
const handleUniversityClick = (item) => {
	uni.navigateTo({
		url: `/pages/schoolDetail/schoolDetail?schoolId=${item.schoolId}`
	});
	console.log('点击的学校 ID:', item.schoolId, '跳转到学校详情页面成功');
};
</script>

<style lang="scss" scoped>
.search-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	
	.search-bar {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 10rpx 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	
		.search-input {
			flex: 1;
			height: 60rpx;
			font-size: 28rpx;
			color: #333;
		}
	
	}
}



.filter-row {
	margin-bottom: 20rpx;
}

.filter-picker {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 16rpx 30rpx;
	font-size: 28rpx;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

}

.university-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.university-card {
	background-color: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

	.image-container {
		height: 200rpx;
		width: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;

		.university-image {
			width: 100%;
			height: 100%;
			display: block;

			::v-deep image {
				min-width: 100%;
				min-height: 100%;
				width: auto;
				height: auto;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) scale(1.1);
				object-fit: cover;
			}
		}
	}

	.university-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		padding: 15rpx 0 0 15rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.university-info {
		display: flex;
		flex-direction: column;
		padding: 15rpx;

		.location {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 10rpx;
		}

		.label-container {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 10rpx;
			gap: 6rpx;

			.label-tag {
				font-size: 20rpx;
				padding: 2rpx 10rpx;
				border-radius: 6rpx;
				white-space: nowrap;
				// color: #fff;
				// background-color: #909399; // 默认颜色
				background-color: #f0f0f0;
				color: #666;

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
	}
}

.no-result {
	grid-column: 1 / -1;
	text-align: center;
	font-size: 28rpx;
	color: #999;
	padding: 40rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;

}
</style>
