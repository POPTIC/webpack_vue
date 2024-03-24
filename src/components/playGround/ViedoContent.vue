<template>

    <!-- 这个页面主要用于测试router -->
    <div>
        <div class="content">
            <!-- 内容区可以使用v-for优化 -->
            <div></div>
            <div></div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </div>
    </div>

</template>

<script setup lang='js'>
import {ref, reactive} from 'vue'

</script>
<style scoped>

.content{
    display: grid;
    grid-template-columns: repeat(3, 230px);
    grid-template-rows: repeat(2, 140px);
    /* 
        grid-template-columns: 150px 200px 200px 200px;
        grid-template-columns: repeat(4, 25%);
        grid-template-rows: repeat(4, 25%);
        grid-template-rows: 1fr 1fr 1fr 1fr;
     */
    grid-row-gap: 20px;
    grid-column-gap: 20px;
}

.content div{
    cursor: pointer;
}

.content > div:nth-child(1){
    /* width: 100%;
    height: 100%; */
    background-color: hsl(0, 93%, 56%);
    /* vertical-align: middle;
    text-align: center; */
    background-image: url('/public/picture/content_pic1.jpg');
    background-size: cover;
    background-position: center;
}

.content > div:nth-child(2){
    background-color: hsl(50, 93%, 56%);
    background-image: url('/public/picture/content_pic2.webp');
    background-size: cover;
    background-position: center;
}

.content > div:nth-child(3){
    background-color: hsl(100, 93%, 56%);
}

.content > div:nth-child(4){
    background-color: hsl(150, 93%, 56%);
}

.content > div:nth-child(5){
    background-color: hsl(200, 93%, 56%);
}

.content > div:nth-child(6){
    background-color: hsl(250, 93%, 56%);
}

</style>