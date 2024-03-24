<template>

 <div class="draw_component"> 
    <label class="palette">palette <input id="palette"  type="color" name="base" v-model="color"></label>
    
    <!-- 这里引出value的值可以使用表单值绑定技巧 -->
    <!-- 单纯将值绑定到value上不能使对于value的修改传递到setup中设置的变量中，还是需要使用事件触发机制来修改值
    但是可以使用v-model来进行双向绑定 -->
    <div class="draw_area">

        <canvas :width="props.width" :height="props.height" id="drawingboard">
            不兼容
        </canvas>

    </div>

 </div>

</template>

<script setup lang='js'>
import {ref, reactive, onMounted } from 'vue';

const props = defineProps(['width', 'height']);

const cav = ref();

const color = ref("#ffc600"); // 可以通过引用给出初始化值

let locationX = 0, locationY = 0;
let isDraw = false;


// function draw(e){
//     // 通过事件来获取鼠标位置
//     // 上下文是通过canvas结点的内置函数来获取的
//     // 不可以在这里设置@change事件函数，因为此时DOM还没有加载不能获取canvas的上下文 
// }


onMounted(()=>{
    // 一定要注意使用的是element还是ref
    let cav = document.getElementById("drawingboard");
    // mounted只会加载一次
    const ctx = cav.getContext('2d'); // 获取上下文，只能在上下文中修改相应的绘制属性
    // 不可以直接通过修改canvas DOM属性来修改上下文
    ctx.lineJoin = 'round'; // 线连接
    ctx.lineCap = 'round'; // 线形
    ctx.lineWidth = 10; // 设置线条宽度
    function draw(e){
        if (!isDraw) return; // stop the fn from running when they are not moused down
        ctx.strokeStyle = color.value;
        ctx.beginPath();
        // start from
        // moveTo使用的主要是相对位置
        ctx.moveTo(locationX, locationY);
        // go to
        ctx.lineTo(e.offsetX, e.offsetY);
        // 注意获取鼠标移动的位置方法：event.offsetX
        ctx.stroke();
        [locationX, locationY] = [e.offsetX, e.offsetY];
    }
    
    cav.addEventListener("mousemove", draw); // 默认会传入一个参数
    cav.addEventListener("mouseup", ()=>{
        isDraw = false;
    })
    cav.addEventListener("mouseout", ()=>{
        isDraw = false;
    })
    cav.addEventListener("mousedown", (e)=>{
        isDraw = true;
        locationX = e.offsetX;
        locationY = e.offsetY;
    })
})

</script>

<style scoped>

.draw_area{
    border: 2px solid slateblue;
}

.palette{
    line-height: 30px;
}

</style>