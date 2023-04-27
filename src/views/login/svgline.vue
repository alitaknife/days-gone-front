
<template>
    <div class="progress-container">
      <svg
        :style="{ transform: clockWise ? 'rotateY(0deg)' : 'rotateY(180deg)' }"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
      >
        <!-- 定义渐变色 -->
        <defs>
          <linearGradient
            :id="gradient.id"
            :x1="gradient.x1"
            :y1="gradient.y1"
            :x2="gradient.x2"
            :y2="gradient.y2"
          >
            <stop
              v-for="(item, index) in gradient.colorStops"
              :key="index"
              :offset="item.offset"
              :stop-color="item.color"
            />
          </linearGradient>
        </defs>
        <!-- 背景环 -->
        <circle
          :cx="baseSideLen"
          :cy="baseSideLen"
          :stroke-width="strokeWidth"
          :r="radius"
          stroke="#57585891"
          fill="none"
        />
        <!-- 进度条环 -->
        <circle
          :cx="baseSideLen"
          :cy="baseSideLen"
          :r="radius"
          :stroke="`url(#${gradient.id})`"
          :stroke-width="strokeWidth"
          :stroke-dasharray="strokeDasharray"
          :stroke-dashoffset="strokeDashoffset"
          :transform="`rotate(-90, ${baseSideLen}, ${baseSideLen})`"
          stroke-linecap="round"
          fill="none"
          class="progress-bar"
        />
      </svg>
    </div>
  </template>
  <script>
  export default {
    name: "Progress",
    props: {
      rate: {
        type: Number,
        default: 0,
      },
      strokeWidth: {
        type: Number,
        default: 10,
      },
      // 顺时针
      clockWise: {
        type: Boolean,
        default: true,
      },
      gradient: {
        type: Object,
        default: () => {
          return {
            id: "svg-linear-gradient",
            x1: "0%",
            y1: "0%",
            x2: "0%",
            y2: "100%",
            colorStops: [
              {
                offset: "0%",
                color: "yellow",
              },
              {
                offset: "100%",
                color: "orange",
              },
            ],
          };
        },
      },
    },
    data() {
      return {
          baseSideLen: 100,
      }
    },
    computed: {
      radius() {
        return this.baseSideLen - this.strokeWidth / 2;
      },
      strokeDasharray() {
        return 2 * Math.PI * this.radius + this.strokeWidth;
      },
      strokeDashoffset() {
        let rate = this.rate;
        rate = rate > 1? 1: rate < 0? 0 : rate;
        return 2 * Math.PI * this.radius * (1 - rate) + this.strokeWidth;
      },
    },
  };
  </script>
  <style scoped>
  .progress-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .progress-bar {
    transition: stroke-dashoffset 1s ease;
  }
  </style>
  