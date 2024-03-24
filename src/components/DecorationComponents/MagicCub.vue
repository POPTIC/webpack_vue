<template>

<div class="panel">

    <div class="input_list">

        <label for="rotate_x">rotate around x axis <input type="range" id="rotate_x" min="0" max="360" v-model="rotate_x" @change="update"></label>
        <label for="rotate_y">rotate around y axis <input type="range" id="rotate_y" min="0" max="360" v-model="rotate_y" @change="update"></label>
        <label for="rotate_z">rotate around z axis <input type="range" id="rotate_z" min="0" max="360" v-model="rotate_z" @change="update"></label>

    </div>
        <div class="wrap">
            <div class="magicCubic" ref="cubic">
            <div class="top">1</div>
            <div class="down">3</div>
            <div class="back">4</div>
            <div class="front">2</div>
            <div class="left">5</div>
            <div class="right">6</div>
        </div>
    </div>
</div>

    

</template>

<script setup lang='js'>
import {ref} from 'vue'

const cubic = ref();

const rotate_x = ref(0);
const rotate_y = ref(0);
const rotate_z = ref(0);

function update(){
    console.log(rotate_y.value);
    cubic.value.style.transform = `rotateX(${rotate_x.value}deg) rotateY(${rotate_y.value}deg) rotateZ(${rotate_z.value}deg)`;
}

</script>


<style scoped>
div.panel{
    display: flex;
    flex-direction: column;
    align-items: center;
}

div.input_list{
    margin: 30px;
}

div.input_list > label{
    display:block;
}

div.input_list{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
div.wrap{
    width: 300px;
    height: 300px;
    border: rgb(130, 47, 144) solid 3px;
    border-radius: 20px;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 800px;
    z-index: 2;
}
div.magicCubic{
    width: 200px;
    height: 200px;
    background-color: bisque;
    box-sizing: border-box;
    position: relative;
    transition: all 2s ease;
    transform-style: preserve-3d;
    /* 必须添加这个属性，否则会覆盖掉3d背面元素 */
}
/* 魔方旋转设计思路，每个面分别按照不同的转点转成一个空间立方体 */
/* 然后通过转动魔方的背景div来实现魔方中所有面按照统一的转轴进行旋转 */
div.magicCubic > div{
    width: 200px;
    height: 200px;
    margin: 0px;
    padding: 0px;
    position: absolute;
    font-size: 70px;
    font-weight: bold;
    line-height: 200px;
    /* line-height用于调节行内内容的间隙大小 */
    color: rgb(255, 255, 255);
    transition: all 2s ease;
    /* 如果在这里设置transfrom会覆盖掉下面各项中的transform : rotate */
    /* rotateX为绕着轴进行旋转，X为轴的方向，transform-origin规定了轴的起点 */
}
.top{
    bottom : 200px;
    /* 这里使用bottom或top对后续的rotate没有影响 */
    background-color: red;
    transform-origin: bottom; 
    transform: translateZ(100px) rotateX(90deg);
    /* transform中变换的顺序有影响（rotate是由元素当前所在位置决定的，translateZ对rotate有影响 */
    /* translateZ(100px)，注意rotate旋转操作，也会改变translateZ的方向
       这里的Z不是全域方向（相对于屏幕的方向）而是垂直于元素面的方向 */
}
.down{
    top : 200px;
    background-color: blue;
    transform-origin: top;
    /* 这里的转轴为当前页面元素的下方，这个下方会随着页面位置的变化而变化（tanslate也会改变这个位置，但是相对于页面的位置不变） */
    transform: translateZ(100px) rotateX(-90deg);
}
.left{
    right: 200px;
    background-color: aqua;
    transform-origin: right;
    transform: translateZ(100px) rotateY(-90deg);
    
}
.right{
    left: 200px;
    background-color: yellow;
    transform-origin: left;
    transform: translateZ(100px) rotateY(90deg); 
    /* 这里规定的转点为针对未变换前的元素位置而制定的转点，不是经过transfromX以后而确定的转点 */
}
.back{
    background-color: coral;
    transform: translateZ(-100px);
}
.front{
    background-color: lightgreen;
    transform: translateZ(100px);
}
div.magicCubic:hover{
    transform: rotateX(-90deg) rotateY(90deg) !important;
}
/* div.magicCubic:hover :where(.top,.front,.back){
    transform: rotateX(100deg);
} */

</style>