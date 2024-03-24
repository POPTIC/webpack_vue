<template>

    <div>
        <div class="content" :class="{ close: article_close }" v-html="props.content"></div>
        <div class="expand" @click="article_close = !article_close"><button>{{ words }}</button></div>
    </div>

</template>

<script setup lang='js'>
import { computed,ref } from 'vue';
const props = defineProps(['content']);

console.log();

const article_close = ref(true);
const words = computed(() => {
    console.log('open');
    if (article_close.value) {
        return "展开";
    }
    else {
        return "关闭";
    }
})

</script>
<style scoped>

.content {
    text-align: center;
    font-size: large;
    font-weight: 600;
    text-align: left;
    margin: 30px;
}

.close {
    overflow: hidden;
    /* text-overflow: ellipsis; */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

.content>p {
    display: inline-block;
    text-align: left;
}

.expand {
    text-align: right;
    padding-right: 30px;
}

.expand>button {
    font-size: medium;
    font-weight: 600;
    border: none;
    background-color: white;
    cursor: pointer;
    color: rgba(90, 18, 234, 0.602);
}

.expand>button:hover {
    color: rgb(204, 85, 34);
}


</style>