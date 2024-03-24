<template>
    <div class="user_galley">
        <!-- 暂时没有想到使用v-for来实现加载的方法 -->
<!-- 这里index是从0开始的 -->
        <!-- <div @click="trans" :key="item" v-for="(item, index) in 4" class="item switch back_pic">
            
            <img style="width: 100%; height: 100%;" :src="list[index]" alt="没有获取到图片">
        </div> -->
        <div @click="trans" class="item switch back_pic" :style="`background:url(${p0}) salmon;background-position: center center;background-size: cover;`">
            <!-- <img style="width: 100%; height: 100%;" alt="没有获取到图片"> -->
        </div>
        <div @click="trans" class="item switch back_pic" :style="`background:url(${p1}) rgb(255, 79, 79);background-position: center center;background-size: cover;`">

            <!-- <img style="width: 100%; height: 100%;" :src="p1" alt="没有获取到图片"> -->
        </div>
        
        <div @click="trans" class="item switch back_pic" :style="`background:url(${p2}) rgb(50, 50, 212);background-position: center center;background-size: cover;`">

            <!-- <img style="width: 100%; height: 100%;" :src="p2" alt="没有获取到图片"> -->
        </div>

        <div @click="trans" class="item switch back_pic" :style="`background:url(${p3}) rgb(255, 255, 105);background-position: center center;background-size: cover;`">

            <!-- <img style="width: 100%; height: 100%;" :src="p3" alt="没有获取到图片"> 插入img效果不好，图片会被伸缩-->
        </div>
    </div>

</template>

<script setup lang='js'>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

// const img_url = computed(() => {
//     return store.state.GalleyStore.galleyUrl;
// })

// 添加一组响应式
const p0 = computed(() => {
    return store.state.GalleyStore.galleyUrl[0];
    // 这里是给值得get方法创建响应式
    // 注意这里和直接绑定ref(store.state.GalleyStore.galleyUrl[0])的区别
});
const p1 = computed(() => {
    return store.state.GalleyStore.galleyUrl[1];
});
const p2 = computed(() => {
    return store.state.GalleyStore.galleyUrl[2];
});
const p3 = computed(() => {
    return store.state.GalleyStore.galleyUrl[3];
});

const list = [];

for(let i in 4){
    list.push(ref(tore.state.GalleyStore.galleyUrl[i]));
}
watch(()=>store.state.GalleyStore.galleyUrl[0],
()=>{
    console.log(1111, list[0]);
})

// 使用computed包装后普通变量转换为了reactive变量

// watch(img_url, () => {
//     console.log(123123, img_url.value[1]);
// })

// 使用创建DOM时静态加载的方式不幸
// function get_url(idx) {
//     return img_url[idx];
//     // return '/picture/ai.webp';
// }
// 对ref的作用没有理解清楚

// 对于setup中定义的元素的作用需要理解

// 计算属性总是返回一个
// const url = ['/picture/ai.webp' ,'/picture/dota2.jpg', '/picture/nana.webp', '/picture/sunset.webp']

// 下面这种通过改变css background来更新图片的方式不幸
// function urlMapImg(idx) {
//     return `background:url('http://127.0.0.1:3000/1/pic1.web');background-size:cover;background-position:center center;`;
// }

// const indexRef = ref([]); // v-for中使用模板引用需要加[]

function trans(event) { // event为DOM原生事件
    event.target.classList.toggle('switch');
}

// onMounted(() => {
//     watch(() => url.value, () => {
//         for (let i = 0; i < 4; i++) {
//             indexRef.value[i].style.background = `background:url(${url.value[i]});background-size:cover;background-position:center center;`;
//         }
//         console.log(indexRef.value[1].style);
//     })})


</script>
<style scoped>
div.user_galley {
    display: flex;
    width: 100%;
    height: 300px;
    transition-timing-function: cubic-bezier(0.48, 0.93, 0.72, 1.05);
}

div.user_galley>div {
    transition: all 1s;
    padding: 0;
    margin: 0;
    flex: 3;
}

/* 需要将将html元素中的class属性想象为key，这个key具有一定的规则，可以通过选择器来选中 */
div.user_galley>div.switch {
    flex-grow: 1;
}

div.user_galley>div:hover {
    flex-grow: 3;
}

/* 对于子代选择器的父元素表示理解错误，nth-child前面的限定为同级兄弟元素 */
div.item:nth-child(1) {
    background-color: rgb(255, 79, 79);
}

div.item:nth-child(2) {
    background-color: rgb(50, 50, 212);
}

div.item:nth-child(3) {
    background-color: salmon;
}

div.item:nth-child(4) {
    background-color: rgb(255, 255, 105);
}
</style>