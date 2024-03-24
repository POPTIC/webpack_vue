<template>

 <div class="backround">

    <div :key="item" v-for="item in board_keys" class="keys" @click="play">
         {{ item }}
    </div>
    
    <audio :key="item" v-for="(item, index) in audio_keys" 
        :src="'sound/' + audio_names[index] + '.wav'" 
        ref="audioref"
        controls hidden="true"></audio>
 </div>
</template>

<script setup lang='js'>

// setup 段的代码出现初始渲染之前，因此在这里打印对于dom的引用总是会返回空值

import {ref, onMounted} from 'vue'


const board_keys = ['A','S','D','F','G','H','J','K','L'];
const audio_keys = board_keys.map((key) => (key.charCodeAt(0)));
const audio_names = ['boom', 'clap', 'hihat', 'kick', 'openhat', 'ride', 'snare', 'tink', 'tom'];

const audioref = ref([]);

onMounted(()=>{
    window.addEventListener('keydown', (e) => {
        let index = board_keys.indexOf(e.key.toUpperCase());
        audioref.value[index].currentTime = 0;
        audioref.value[index].play();
    })
})

</script>
<style scoped>

div.backround{
    background: url("/public/picture/drumKitBackground.jpg") center;
    /* background为一个组合属性 */
    background-size: cover;
    /* 这里单独给某个属性设置值，可以避免组合属性组合语法问题 */
    display: flex;
    /* 当块级元素设置为flex布局后，其会转换为弹性盒子，
    在盒子中的子元素会受到这种布局模式的影响，
    而弹性盒子本身仍然遵守其父元素的布局模式摆放 */
    align-items: center;
    justify-content: center;
} 

div.keys{
    flex: 1;
    /* 注意flex属性是用于规定弹性盒子容器中装载的子元素的伸缩性的 */
    margin: 10px;
    font-size: large;
    font-family:Arial, Helvetica, sans-serif;
    background: rgba(93, 67, 112, 0.4);
    border: 1px rgba(224, 214, 22, 0.8) solid;
    padding: 10px;
    color: red;
}

</style>