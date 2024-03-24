<template>
<div class="slogan">
    {{ props.slogan }}
</div>
 <div class="deco_band">
    
 </div>
 

</template>

<script setup lang='js'>

 const props = defineProps(['slogan']); // 非响应式的
 // 直接打印props会得到一个JSON字符串

</script>
<style scoped>

.slogan{
    font-size: xx-large;
    font-weight: bold;
    text-align: left;
    padding-left: 50px;
}

.deco_band{
    border: 3px solid white;
    width: 100%;
    height: 10px;
    background: linear-gradient(53deg, red, orange, yellow, green, cyan, blue, purple);
    animation: hue 6s linear infinite;
    margin-bottom: 30px;
}

@keyframes hue {
             from { filter: hue-rotate(0deg); }
             to   { filter: hue-rotate(360deg); }
         }

</style>