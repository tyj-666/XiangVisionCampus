<template>
	<view class="route-max" :style="{height:screenHeight + 'px'}">
		<!-- 内容展示框 -->
		<view class="route-content-show">
			<scroll-view scroll-y="true" class="route-scroll-Y" lower-threshold="50" :scroll-top="scrollTop" @scroll="scrolList" :scroll-anchoring="true">
				<view v-for="(item,index) in contentList" :key="index">
					<!-- 用户输入的信息内容框 -->
					<view class="route-user-box" v-if="item.type == 'user'">
						<!-- 输入的内容框 -->
						<view class="route-input-box">
							<view class="route-input-content">{{item.text}}</view>
						</view>
						<!-- 用户头像 -->
						<image src="/static/user.jpg" mode="widthFix"
							style="width:70rpx;height:70rpx;border-radius:50%;"></image>
					</view>
					<!-- AI回复的信息内容框 -->
					<view class="route-Ai-box" v-if="item.type == 'AI'">
						<!-- AI头像 -->
						<image src="/static/index/logo.png" mode="widthFix"
							style="width:70rpx;height:70rpx;border-radius:50%;"></image>
						<!-- AI回复的内容框 -->
						<view class="route-Ai-input">
							<!-- 光标加载动画 -->
							<view class="smaa-user-cursor" v-if="item.cursorInex"></view>
							<!-- 回复的内容 -->
							<view class="route-Ai-content">
								{{ item.showText || '' }}
							</view>
						</view>
					</view>
				</view>
				<view style="height: 140rpx;"></view> <!-- 底部留白，确保内容不被输入框遮挡 -->
			</scroll-view>
		</view>
		
		<!-- 固定在底部的输入框 -->
		<view class="route-bottom-fixed" >
			<view class="route-bottom-box">
				<input type="text" v-model="information" placeholder="输入你想资讯的问题" class="route-bottom-input" 
					@confirm="clickSending" />
				<up-icon v-if="showSendIcon" name="arrow-up" @tap="clickSending()" size="30px" tyle="width:60rpx;height:60rpx;margin-left: 15rpx;"></up-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { askAi } from '../../api/api.js'

// 响应式数据
const information = ref('')
const contentList = ref([])
const scrollTop = ref(0)
const old = ref({ scrollTop: 0 })
const screenHeight = ref(0)
const currentTypingIndex = ref(-1) // 当前正在打字效果的AI消息索引


// 控制发送按钮图标显示的变量
const showSendIcon = computed(() => {
	// 找到最后一条AI消息
	let aiIndex = -1;
	for (let i = contentList.value.length - 1; i >= 0; i--) {
		if (contentList.value[i].type === 'AI') {
			aiIndex = i;
			break;
		}
	}
	// 只有一条AI消息且是第一条，始终显示按钮
	if (aiIndex === 0) return true;
	// 其余AI消息未打字完毕时隐藏按钮
	if (aiIndex !== -1) return !!contentList.value[aiIndex].typingComplete;
	// 没有AI消息时允许发送
	return true;
});

// 生命周期钩子
onMounted(() => {
	// 同步获取设备屏幕的高度
	const windowInfo = uni.getWindowInfo()
	screenHeight.value = windowInfo.windowHeight
	execute()
})

// 方法
const execute = () => {
	// 默认AI回复
	contentList.value.push({
		type: 'AI',
		reply: `您好，我是湖南高校推荐官，您可以按以下问我：\n• 湖南有哪些本科/专科高校呀？\n• XX大学的特色专业是什么？\n• 湖南高校近年的录取分数线是多少？\n• 某所大学的校园环境、宿舍条件怎么样？\n• 湖南高校的招生政策（比如省内/省外招生计划）有哪些？\n• XX专业在湖南哪些高校实力较强？\n• 湖南高校的奖学金、助学金政策是什么？\n• 高校毕业生就业情况（比如就业率、热门就业方向）如何？\n有任何想了解的，随时问我呀~`,
		showText: '', // 显示的文字
		cursorInex: false,
		typingComplete: false // 打字是否完成
	})
	startTypingEffect(contentList.value.length - 1)
}

const clickSending = () => {
	if (!information.value.trim()) {
		uni.showToast({
			title: '请输入想资讯的内容',
			icon: 'none',
			duration: 2000
		})
		return
	}
	
	// 添加用户消息
	contentList.value.push({
		type: 'user',
		text: information.value,
		cursorInex: false
	})
	
	// 滚动到底部
	scrollToBottom()
	
	// 保存输入内容并清空输入框
	const userInput = information.value
	information.value = ''
	
	// 请求AI回复
	askAiRequest(userInput)
}

const scrolList = (e) => {
	old.value.scrollTop = e.detail.scrollTop
}

const askAiRequest = (prompt) => {
	// 添加AI回复占位
	const aiMessage = {
		type: 'AI',
		reply: '',
		showText: '', // 显示的文字
		cursorInex: true,
		typingComplete: false
	}
	contentList.value.push(aiMessage)
	currentTypingIndex.value = contentList.value.length - 1
	
	scrollToBottom()
	
	askAi({ prompt: prompt }).then(res => {
		if (res.code === 200) {
			const reply = res.data || '抱歉，未能获取回复内容'
			// 更新回复内容
			contentList.value[currentTypingIndex.value].reply = reply
			contentList.value[currentTypingIndex.value].cursorInex = false
			startTypingEffect(currentTypingIndex.value)
		} else {
			throw new Error(res.message || '请求失败')
		}
	}).catch(err => {
		console.error('请求出错:', err)
		contentList.value[currentTypingIndex.value].reply = '抱歉，请求出错，请稍后再试'
		contentList.value[currentTypingIndex.value].cursorInex = false
		startTypingEffect(currentTypingIndex.value)
	})
}

const startTypingEffect = (index) => {
	const message = contentList.value[index]
	if (!message || message.typingComplete) return
	
	// 重置显示文本
	message.showText = ''
	let currentCharIndex = 0
	const fullText = message.reply
	
	// 清除之前的定时器
	if (message.typingTimer) {
		clearInterval(message.typingTimer)
	}
	
	message.typingTimer = setInterval(() => {
		if (currentCharIndex >= fullText.length) {
			clearInterval(message.typingTimer)
			message.typingComplete = true
			return
		}
		
		// 更新当前消息的显示文本
		message.showText = fullText.substring(0, currentCharIndex + 1)
		currentCharIndex++
		
		// 触发视图更新
		contentList.value = [...contentList.value]
		
		// 滚动到底部
		scrollToBottom()
	}, 20) // 速度加快
}

const scrollToBottom = () => {
	nextTick(() => {
		scrollTop.value = old.value.scrollTop
		nextTick(() => {
			scrollTop.value = 999999
		})
	})
}
</script>

<style lang="scss" scoped>
.route-max {
	width: 100%;
	background-size: cover;
	background-image: url('https://xnlv.lizxx.com/image/xnlv/static/yunzhanguan/yunzhanguanimage-49603.png');
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 120rpx; /* 为固定输入框留出空间 */

	.route-content-show {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		box-sizing: border-box;
		overflow: hidden;

		.route-scroll-Y {
			width: 100%;
			height: 100%;
			overflow-anchor: auto;
			padding-bottom: 20rpx;
		}
	}

	/* 固定在底部的输入框容器 */
	.route-bottom-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 20rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.route-user-box {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;

		.route-input-box {
			max-width: 70%;
			background-color: #ffffff;
			border-radius: 20rpx 5rpx 20rpx 20rpx;
			margin-right: 15rpx;
			margin-top: 20rpx;

			.route-input-content {
				font-size: 32rpx;
				color: #000;
				padding: 20rpx;
				word-break: break-word;
			}
		}

		image {
			margin-top: 20rpx;
		}
	}

	.route-Ai-box {
		display: flex;
		margin-top: 20rpx;
		align-items: flex-start;

		image {
			margin-top: 20rpx;
		}

		.route-Ai-input {
			background-color: #ffffff;
			border-radius: 5rpx 20rpx 20rpx 20rpx;
			margin-left: 15rpx;
			margin-top: 20rpx;
			max-width: 70%;

			.smaa-user-cursor {
				width: 4rpx;
				height: 30rpx;
				margin: 20rpx;
				background-color: #000;
				animation: loading 1s infinite;
			}

			@keyframes loading {
				0% {
					opacity: 0.8;
				}

				100% {
					opacity: 0;
				}
			}

			.route-Ai-content {
				font-size: 32rpx;
				color: #000;
				padding: 20rpx;
				word-break: break-word;
				white-space: pre-wrap;
			}
		}
	}

	.route-bottom-box {
		width: 100%;
		height: 100rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		border-radius: 75rpx;
		padding: 0 25rpx;
		box-sizing: border-box;

		.route-bottom-input {
			flex: 1;
			height: 70rpx;
			font-size: 30rpx;
			color: #000;
		}
	}
}

</style>