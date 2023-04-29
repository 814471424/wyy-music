<!-- 进度条主要组件 -->
<template>
  <div :class="{ 'progress': !props.vertical, 'progress-vertical': props.vertical }" ref="propreee">
    <div :class="{ 'progress-bar': !props.vertical, 'progress-bar-vertical': props.vertical }" ref="progressBar">
      <div :class="{ 'progress-fill': !props.vertical, 'progress-fill-vertical': props.vertical }" ref="progressFill">
      </div>
      <div :class="{ 'progress-dot': !props.vertical, 'progress-dot-vertical': props.vertical }" ref="progressDot">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';

let propreee: Ref<HTMLElement | null> = ref(null);
let progressBar: Ref<HTMLElement | null> = ref(null);
let progressFill: Ref<HTMLElement | null> = ref(null);
let progressDot: Ref<HTMLElement | null> = ref(null);
let isDragging = false;
let newTime = 0;

const props = defineProps({
  // 当前数
  modelValue: {
    type: Number,
    required: true
  },
  // 最大数
  max: {
    type: Number,
    default: 100
  },
  // 进度条修改完成触发的事件
  // 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）
  change: {
    type: Function,
    default(value: number) {
      // console.log(value)
    }
  },
  // 数据改变时触发（使用鼠标拖曳时，活动过程实时触发）
  input: {
    type: Function,
    default(value: number) {
      // console.log(value)
    }
  },
  // 垂直模式
  vertical: {
    type: Boolean,
    default: false
  }
})

watch(() => props.modelValue, () => {
  updateFillAndDOt()
})

watch(() => props.max, () => {
  updateFillAndDOt()
})

onMounted(() => {
  // 初始化进度条
  updateFillAndDOt()

  // 监听鼠标事件
  propreee.value!.addEventListener('mousedown', (event) => {
    event.preventDefault();
    isDragging = true;
    updateProgress(event);
  });
  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      updateProgress(event)
    }
  });
  document.addEventListener('mouseup', (event) => {
    if (isDragging) {
      isDragging = false;
      updateProgress(event);
      props.change(newTime)
    }
  });

  // 监听手机端移动事件
  propreee.value!.addEventListener('touchstart', (event) => {
    event.preventDefault();
    isDragging = true;
    updateProgress(event.changedTouches[0]);
  });
  document.addEventListener('touchmove', (event) => {
    if (isDragging) {
      updateProgress(event.changedTouches[0])
    }
  });
  document.addEventListener('touchend', (event) => {
    if (isDragging) {
      isDragging = false;
      updateProgress(event.changedTouches[0]);

      props.change(newTime)
    }
  });

  // 监听鼠标点击事件
  propreee.value!.addEventListener('click', (event) => {
    updateProgress(event);

    props.change(newTime)
  });
})

function updateProgress(event: MouseEvent | Touch) {

  let progressPercent = 0
  if (props.vertical) {
    console.log(event.clientY)
    const barHeight = progressBar.value!.clientHeight;
    const clickPosition = event.clientY - progressBar.value!.getBoundingClientRect().top;
    progressPercent = ((barHeight - clickPosition) / barHeight) * 100;
  } else {
    const barWidth = progressBar.value!.clientWidth;
    const clickPosition = event.clientX - progressBar.value!.getBoundingClientRect().left;
    progressPercent = (clickPosition / barWidth) * 100;
  }

  if (progressPercent >= 0 && progressPercent <= 100) {
    if (props.vertical) {
      progressFill.value!.style.height = `${progressPercent}%`;
      progressDot.value!.style.bottom = `calc(${progressPercent}% - 5px)`
    } else {
      progressFill.value!.style.width = `${progressPercent}%`;
      progressDot.value!.style.left = `calc(${progressPercent}% - 5px)`
    }

    newTime = (progressPercent / 100) * props.max;

    props.input(newTime)
  }
}

// 初始化进度条
function updateFillAndDOt() {
  let progressPercent = (props.modelValue / props.max) * 100
  if (progressPercent < 0 || progressPercent > 100) {
    progressPercent = 0;
  }

  if (props.vertical) {
    progressFill.value!.style.height = `${progressPercent}%`;
    progressDot.value!.style.bottom = `calc(${progressPercent}% - 5px)`
  } else {
    progressFill.value!.style.width = `${progressPercent}%`;
    progressDot.value!.style.left = `calc(${progressPercent}% - 5px)`
  }
}
</script>

<style lang="less" scoped>
.progress {
  width: 100%;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color: #ffffff00;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #eee;
  border-radius: 3px;
}

.progress-fill {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0;
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 3px;
}

.progress-dot {
  position: absolute;
  top: -3px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--primary-color);
  cursor: pointer;
}


.progress-vertical {
  height: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: #ffffff00;
}

.progress-bar-vertical {
  position: relative;
  height: 100%;
  width: 4px;
  background-color: #eee;
  border-radius: 3px;
}

.progress-fill-vertical {
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 0;
  width: 100%;
  background-color: var(--primary-color);
  border-radius: 3px;
}

.progress-dot-vertical {
  position: absolute;
  bottom: 0;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--primary-color);
  cursor: pointer;
}
</style>