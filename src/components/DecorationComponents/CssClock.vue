<template>

    <div class="clock">

        <div class="clockFace" ref="clock_face">
            <div class="second" ref="secondHand"></div>
            <div class="minite" ref="miniteHand"></div>
            <div class="hour" ref="hourHand"></div>
        </div>

    </div>

</template>

<script setup lang='js'>
import { ref, onMounted } from 'vue'


// const secondHand = ref();
// const miniteHand = ref();
// const hourHand = ref();

// 使用ref引用会出现bug

// function updateHand() {
//     const now = new Date();
//     let deg = (now.getSeconds()) * 6;
//     secondHand.value.style.transform = `rotate(${deg - 90}deg)`;
//     deg = (now.getMinutes() / 60) * 360;
//     miniteHand.value.style.transform = `rotate(${deg - 90}deg)`;
//     deg = (now.getHours() / 12) * 360;
//     hourHand.value.style.transform = `rotate(${deg - 90}deg)`;
// }

onMounted(() => {
    let secondHand = document.getElementsByClassName("second")[0];
    let miniteHand = document.getElementsByClassName("minite")[0];
    let hourHand = document.getElementsByClassName("hour")[0];
    function updateHand() {
        const now = new Date();
        let deg = (now.getSeconds()) * 6;
        secondHand.style.transform = `rotate(${deg - 90}deg)`;
        deg = (now.getMinutes() / 60) * 360;
        miniteHand.style.transform = `rotate(${deg - 90}deg)`;
        deg = (now.getHours() / 12) * 360;
        hourHand.style.transform = `rotate(${deg - 90}deg)`;
    }
    setInterval(updateHand, 1000);
    // function updateBizer(){
    //     clock_face.value.transitionTimingFunction = `cubic-bezier(0.1, 2.7, 0.58, 1)`;
    //     // 因为原属性名称中有-和function，因此需要使用新的transitionTimingFunction来引用
    // }
})

</script>

<style scoped>
div.clock {
    margin: 10px;
}

div.clockFace {
    border: 3px solid rgb(151, 52, 139);
    border-radius: 50%;
    position: relative;
    background: linear-gradient(217deg, rgba(255, 0, 0, .8), rgba(255, 0, 0, 0) 70.71%),
        linear-gradient(127deg, rgba(0, 255, 0, .8), rgba(0, 255, 0, 0) 70.71%),
        linear-gradient(336deg, rgba(0, 0, 255, .8), rgba(0, 0, 255, 0) 60%);
    /* todo: 最后一个百分比参数 */
    width: 300px;
    height: 300px;
}

div.clockFace>div {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3px;
    border-top-right-radius: 30%;
    border-bottom-right-radius: 30%;
    transform-origin: left;
    transform: rotate(0deg);
    transition: all 1s;
    /* transition用于定义转换 */
    transition-timing-function: cubic-bezier(0.48, 0.93, 0.72, 1.05);
}

div.second {
    width: 45%;
    background-color: red;
}

/* 注意css布局 ： 如何将多个html元素重叠显式 */
div.minite {
    width: 38%;
    background-color: blue;
}

div.hour {
    width: 30%;
    background-color: yellow;
}
</style>