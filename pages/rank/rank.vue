<template>
  <view class="page">
    <!-- 页面头部 -->
    <view class="header">
      <view class="title">
        <text class="title-text">湖南高校排行榜</text>
      </view>
    </view>

    <!-- 排行榜 -->
    <view class="ranking-list">
      <view
        class="ranking-item"
        v-for="(item, index) in rankings"
        :key="item.id"
        :class="[
          'ranking-card', 
          `rank-${index + 1}`, 
          { 
            'card-selected': selectedIndex === index,
            'animate-in': shouldAnimate
          }
        ]"
        :style="shouldAnimate ? { '--delay': `${index * 0.1}s` } : {}"
        @click="selectCard(index)"
      >
        <view class="rank">
          <view v-if="index < 3" :class="['rank-icon', { gold: index === 0, silver: index === 1, bronze: index === 2 }]">
            <text class="rank-text">{{ index + 1 }}</text>
          </view>
          <text v-else class="rank-text">{{ index + 1 }}</text>
        </view>
        <view class="rank-info">
          <image :src="item.schoolLogo" class="rank-image" />
          <text class="rank-name">{{ item.schoolName }}</text>
        </view>
        <view class="rank-actions">
          <view class="like-section" @tap.stop="likeSchool(index)">
            <text class="like-icon" :class="{ 'like-animation': item.likeAnimating }">👍</text>
            <text class="like-count">{{ item.likes }}w</text>
          </view>
          <view class="more-options" @click="handleUniversityClick(item)">...</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, reactive, nextTick, toRefs } from 'vue';
import { getSchoolRank } from '../../api/api.js';
import { onShow } from '@dcloudio/uni-app';

const state = reactive({
  rawRankings: [],
  selectedIndex: -1,
  lastLikedIndex: -1,
  shouldAnimate: false
});

const rankings = computed(() => {
  return [...state.rawRankings].sort((a, b) => b.likes - a.likes);
});

const { rawRankings, selectedIndex, lastLikedIndex, shouldAnimate } = toRefs(state);

onShow(() => {
  // 重置动画状态
  state.shouldAnimate = false;
  
  getSchoolRank().then((res) => {
    state.rawRankings = res.data.map((item, index) => ({
      ...item,
      id: item.id || index,
      likeAnimating: false,
    }));
    
    // 数据加载完成后启用动画
    nextTick(() => {
      state.shouldAnimate = true;
    });
  });
});

const likeSchool = (index) => {
  const school = state.rawRankings.find(item => item.id === rankings.value[index].id);
  if (school) {
    state.lastLikedIndex = index;
    school.likes += 1;
    school.likeAnimating = true;
    setTimeout(() => {
      school.likeAnimating = false;
    }, 500);
  }
};

const selectCard = (index) => {
  state.selectedIndex = state.selectedIndex === index ? -1 : index;
};

const handleUniversityClick = (item) => {
  uni.navigateTo({
    url: `/pages/schoolDetail/schoolDetail?schoolId=${item.schoolId}`
  });
};
</script>

<style lang="scss" scoped>
.page {
  background: #f7f7f7;
  color: #333;

  .header {
    display: flex;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #6a2c88, #ff64b7);
    padding: 30rpx;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    .title {
      text-align: center;
      flex: 1;
    }

    .title-text {
      font-size: 25px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  }
}

.ranking-list {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;

  .ranking-card {
    display: flex;
    align-items: center;
    padding: 25rpx;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    opacity: 0;
    
    &.animate-in {
      animation: slideIn 0.5s ease forwards;
      animation-delay: var(--delay, 0s);
    }

    &.card-selected {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px) scale(1.01);
      background: #f9f9f9;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 5rpx;
        background: linear-gradient(to bottom, #6a2c88, #ff64b7);
      }
    }

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      transform: translateY(-2px);
    }
  }

  .rank {
    display: flex;
    align-items: center;
    width: 85rpx;
    justify-content: center;
    margin-right: 10rpx;

    .rank-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      position: relative;
    }

    .rank-text {
      font-size: 40rpx;
      font-weight: bold;
      color: gold;
    }
  }

  .rank-info {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;

    .rank-image {
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      transition: transform 0.3s ease;

      .ranking-card:hover &,
      .card-selected & {
        transform: scale(1.1);
      }
    }

    .rank-name {
      font-size: 28rpx;
      color: #333;
      margin-left: 5rpx;
    }
  }

  .rank-actions {
    display: flex;
    align-items: center;
    gap: 5rpx;

    .like-section {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10rpx 15rpx;
      border-radius: 50rpx;
      transition: all 0.3s ease;

      &:hover {
        background: #f5f5f5;
      }

      .like-icon {
        font-size: 28rpx;
        color: #ff4444;
        transition: transform 0.3s ease;

        &.like-animation {
          animation: likePulse 0.5s ease-in-out;
        }
      }

      .like-count {
        font-size: 22rpx;
        color: #333;
        margin-left: 5rpx;
      }
    }

    .more-options {
      width: 100%;
      color: #888;
      padding: 10rpx 20rpx;
      border-radius: 50%;
      transition: all 0.3s ease;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}

.gold {
  background: linear-gradient(45deg, #ffd700, #ffaa00);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.gold::after {
  content: '👑';
  position: absolute;
  font-size: 12px;
  top: -5px;
  right: -5px;
}

.silver {
  background: linear-gradient(45deg, #c0c0c0, #a9a9a9);
  box-shadow: 0 0 10px rgba(192, 192, 192, 0.5);
}

.silver::after {
  content: '⭐';
  position: absolute;
  font-size: 12px;
  top: -5px;
  right: -5px;
}

.bronze {
  background: linear-gradient(45deg, #cd7f32, #a0522d);
  box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
}

.bronze::after {
  content: '🏅';
  position: absolute;
  font-size: 12px;
  top: -5px;
  right: -5px;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes likePulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>