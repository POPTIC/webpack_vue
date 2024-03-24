<template>
    <div class="hot_container">
        <div class="title" ref="title">热门文章</div>
        <div :style="{ height: placeholderUp + 'px' }"></div>
        <div v-for="arr in visual_data" class="item_wrapper" :key="arr[0]" :style="{ height: item_height }">
            <!-- 这里key如果设置为相同的则会导致虚拟列表快速替换 -->
            <div v-html="arr[1]" class="item"></div>
        </div>
        <div :style="{ height: placeholderDown + 'px' }"></div>
    </div>
</template>

<script setup lang='js'>
import { ref, computed, onMounted } from 'vue'

const list = [];
const item_num = 20;
const total_num = 100;
let start = ref(0);
let end = ref(0);
const placeholderUp = ref(0);
const placeholderDown = ref(0);
const item_height = 300;
let timeout = null;
const total_size = total_num * item_height;
const title = ref();
let title_length = 0;

for (let i = 0; i < total_num; i++) {
    list.push([i, `<p>Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariaturlores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
    <p>Adipisicing elit. Tempore tempora rerum..</p>`]);
}


let visual_data = computed(() => { // computed不会主动响应
    return list.slice(start.value, end.value); // 左闭右开的
})

function update() {
    const scrollDistance = window.scrollY - title_length;
    if (scrollDistance >= 3 * item_height) {
        start.value = ~~(scrollDistance / item_height) - 3;
        end.value = start.value + item_num;

        // 通过向下偏移来保留缓冲div区
        // 可以通过帧分析来确定移动的规律
        // 1. 在页面没有划过缓冲区之前 start 和 placeholder 不动
        // 2. 划过缓冲区后，placeholder增加，同时start游标往后移动
        // 注意是scrollDistance - (scrollDistance % item_height) - 这样在滑倒div中间时不会触发数值变更
        placeholderUp.value = scrollDistance - (scrollDistance % item_height) - 3 * item_height;
        placeholderDown.value = total_size - placeholderUp.value - item_num * item_height;
        // 使用ref类型的变量最好不要使用如下方式来赋值 - 会产生连锁反应
        // placeholderDown.value = total_size - (scrollDistance - (scrollDistance % item_height) - 3 * item_height);
    }
    else {
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
    title_length = title.value.clientHeight;
    placeholderUp.value = 0;
    placeholderDown.value = (total_num - item_num) * item_height;
})


</script>

<style scoped>
.hot_container {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.title {
    color: blue;
    font-size: xx-large;
    font-weight: bold;

}

.item_wrapper {
    width: 80%;
    text-align: center;
    box-sizing: border-box;
    margin: 10px;
    padding: 5px;
    height: 300px;
    background-color: rgb(255, 255, 255);
    outline: 3px solid rgb(101, 129, 255);
}

.item {
    width: 100%;
    height: 100%;
    font-size: large;
    font-weight: 600;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    text-align: left;
}
</style>