<template>
	<view class="welcome-bg" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
		<image class="welcome-bg-img" src="/static/index/bg.jpg" mode="aspectFill" />
		<view class="welcome-content" :class="{ 'fade-in-up': showContent }" v-show="showContent">
			<image class="welcome-logo" src="/static/index/logo.png" mode="heightFix" />
			<view class="welcome-title">湘云校瞰</view>
			<view class="welcome-sub">XiangVision Campus</view>
			<view class="welcome-tip">欢迎来到项目展示</view>
			<view class="welcome-arrow">
				<view class="arrow-circle">
					<up-icon class="arrow-img" name="arrow-up" size="38rpx" color="#00aa7f"></up-icon>
				</view>
				<view class="arrow-text">上滑进入</view>
			</view>
		</view>
		<view v-if="showLoading" class="loading-mask">
			<view class="loading-spinner-simple"></view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 响应式状态
const startY = ref(0);
const isSwiping = ref(false);
const showContent = ref(false);
const showLoading = ref(false);

onMounted(() => {
	setTimeout(() => {
		showContent.value = true;
	}, 80);
});

// 触摸事件处理
const onTouchStart = (e) => {
	startY.value = e.touches[0].clientY;
	isSwiping.value = false;
};

const onTouchMove = (e) => {
	const moveY = e.touches[0].clientY;
	if (startY.value - moveY > 60) {
		// 上滑超过60px
		isSwiping.value = true;
	}
};

const onTouchEnd = () => {
	if (isSwiping.value) {
		showLoading.value = true;
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/home/home'
			});
		}, 150); // 动画展示350ms
	}
};
</script>

<style lang="scss">
.welcome-bg {
	width: 100%;
	height: 100vh;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #eaf3ff;
	overflow: hidden;
}
.welcome-bg-img {
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	z-index: 0;
	object-fit: cover;
	opacity: 0.7;
}
.welcome-content {
	margin-top: 200rpx;
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
}

// 淡入上滑动画 
.fade-in-up {
	animation: fadeInUp 0.7s cubic-bezier(0.23, 1.01, 0.32, 1) both;
}

@keyframes fadeInUp {
	/* 初始状态：透明且向下偏移 */
	0% {
		opacity: 0;
		transform: translateY(40rpx);
	}
	/* 结束状态：不透明且无偏移 */
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 新增文字加载动画 */
@keyframes slideDown {
	// 从上方滑入 
	from {
		transform: translateY(-50px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
@keyframes slideUp {
	from {
		transform: translateY(50px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
.welcome-logo {
	width: 350rpx;
	height: 350rpx;
	margin-bottom: 250rpx;
}
.welcome-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #234;
	margin-bottom: 30rpx;
	letter-spacing: 2rpx;/* 字间距 */
	animation: slideDown 1s ease-in-out;/* 下滑入场动画 */
}
.welcome-sub {
	font-size: 28rpx;
	color: #00523a;
	margin-bottom: 30rpx;
	animation: slideUp 1s ease-in-out;/* 上滑入场动画 */
}
.welcome-tip {
	font-size: 26rpx;
	color: #666;
	margin-bottom: 80rpx;
	animation: slideUp 1s ease-in-out;/* 上滑入场动画 */
}
.welcome-arrow {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 48rpx;
	gap: 12rpx;
	
	.arrow-circle {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(188, 255, 210, 0.2) 0%, rgba(59, 179, 133, 0.18) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2rpx 8rpx rgba(79, 140, 255, 0.1);
		margin-bottom: 2rpx;
		animation: arrowMove 1.2s infinite alternate;
		
	}
	
	.arrow-text {
		font-size: 26rpx;
		color: #00916a;
		opacity: 0.85;
		margin-top: 2rpx;
		letter-spacing: 2rpx;
		text-shadow: 0 1rpx 4rpx rgba(79, 140, 255, 0.1);
	}
}

@keyframes arrowMove {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(-16rpx);
	}
}
/* loading 动画样式保持不变 */
.loading-mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.18);
	z-index: 99;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.loading-spinner-simple {
	width: 48rpx;
	height: 48rpx;
	border: 3rpx solid #4f8cff;
	border-top: 3rpx solid transparent;
	border-radius: 50%;
	animation: spinSimple 0.7s linear infinite;
}
@keyframes spinSimple {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
