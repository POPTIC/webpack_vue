<template>

 <div class="player_board">
    <div class="record" @click="shift_player_state">
        <div class="inner_hole">
        </div>
    </div>
    <div class="record_msg">
        <div class="record_name">
            record : <span>{{ record }}</span>
        </div>
        <div class="record_author">
            author : <a :href="author_link" target="_blank"><span>{{ author }}</span></a>
        </div>
        <div class="volume_editor">
            <img src="/public/icons/volume.svg">
            <input type="range" v-model="volume" min="0" max="1" step="0.02">
        </div>
        <div class="record_shift">
            <img src="/public/icons/pre_record.svg">
            <img src="/public/icons/bofang.svg">
            <img src="/public/icons/next_record.svg">
        </div>
    </div>
 </div>
</template>

<script setup lang='js'>
import {ref, reactive, watchPostEffect, watch} from 'vue'

// TODO: 对volume设置watch监控，当volume为0时自动触发图标改变
// TODO: 这个值注册到vuex
const author = ref('Adele Adkins');
const record = ref('Hello');
// TODO: 向vuex中注册状态
const author_link = ref('https://www.baidu.com/');

const volume = ref(0.3);

const player_control = ref(false);

function shift_player_state(){
    player_control.value = !player_control.value;
    console.log(player_control.value);
}

// TODO: 这里使用watch来监听播放是否停止从而来进行一系列的任务，注意watch的作用

// TODO: 这里添加一个防抖装置放置重复点击播放音乐

// TODO: 这里需要实现分片上传机制

const player_icon = ref();
// 控制播放标签


</script>
<style scoped>

/* TODO: 实现盘面旋转效果 */
img{
    width: 30px;
    height: 30px;
}
.player_board{
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.record{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: brown;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 自动填充margin */
    cursor: pointer;
    background-image: url(/public/picture/hello.jpg);
    background-size: cover;
    background-position: center center;
}
@keyframes record_rotate {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.record{
    animation: record_rotate 6s linear infinite;
}

.inner_hole{
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: black;
}
.record_msg{
    text-align: center;
    font-size: medium;
    font-weight: 600;
}
/* TODO: 添加点击图片画叉动画 */
.record_name > span{
    font-weight: bold;
    color : rgb(73, 18, 225);
}
.record_author > span{
    font-size: small;
    color: rgb(80, 80, 80);
}
.record_author a{
    text-decoration: none;
    
}
.volume_editor{
    padding: 10px;
    display: flex;
    justify-content: center;
    /* 沿着轴方向边界对齐 */

    height: 30px;
    img{
        display: block;
    }
}
.record_shift{
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.record_shift img{
    cursor: pointer;
}

</style>