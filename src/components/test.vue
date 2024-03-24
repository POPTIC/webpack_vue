<template>
  <div class="container">
    <div>
      <div :style="{ height: placeholderUp + 'px' }"></div>
      <div v-for="data in visual_data" class="item" :key="data" :style="{ height: item_height }">
        {{ data }}
      </div>
      <!-- <div :style="{height: placeholderDown + 'px'}"></div> -->
    </div>
  </div>
</template>

<script setup lang='js'>
import { ref, reactive, computed, onMounted } from 'vue'
const list = [];
const item_num = 20;
const total_num = 1000;
let start = ref(0);
let end = ref(0);
const placeholderUp = ref(0);
const placeholderDown = ref(0);
const item_height = 300;
let timeout = null;
const total_size = total_num * item_height;

for (let i = 0; i < total_num; i++) {
  list.push(i.toString() + "hello world");
}


let visual_data = computed(() => { // computed不会主动响应
  return list.slice(start.value, end.value); // 左闭右开的
})

function update() {
  const scrollDistance = window.scrollY;
  console.log(scrollDistance);
  if (scrollDistance >= 3 * item_height) {
    start.value = ~~(scrollDistance / item_height) - 3;
    end.value = start.value + item_num;

    // 通过向下偏移来保留缓冲div区
    // 可以通过帧分析来确定移动的规律
    // 1. 在页面没有划过缓冲区之前 start 和 placeholder 不动
    // 2. 划过缓冲区后，placeholder增加，同时start游标往后移动
    // 注意是scrollDistance - (scrollDistance % item_height) - 这样在滑倒div中间时不会触发数值变更
    placeholderUp.value = scrollDistance - (scrollDistance % item_height) - 3 * item_height;
    // placeholderDown.value = total_size - placeholderUp.value - item_num * item_height;
    // 使用ref类型的变量最好不要使用如下方式来赋值 - 会产生连锁反应
    placeholderDown.value = total_size - (scrollDistance - (scrollDistance % item_height) - 3 * item_height);

  }
  else{
    start.value = 0;
  }

}

window.onscroll = function (e) {
  if (!timeout) {
    timeout = setTimeout(update, 300, e.target);
    timeout = null;
  }
}

onMounted(() => {
  start.value = 0;
  end.value = start.value + item_num;
  placeholderUp.value = 0;
  placeholderDown.value = (total_num - item_num) * item_height;
})


</script>

<style scoped>
.item {
  width: 300px;
  height: 300px;
  background-color: rgb(135, 135, 249);
  outline: 1px solid red;
}
</style>