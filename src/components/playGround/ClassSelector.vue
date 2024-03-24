<template>

 <div class='selector_item_container'>
    <div class="selector_item" v-for="(item) of itemsName" :key="item">
        <img :src="'icons/' + item + '.svg'" width="40px">
        <span>{{ map.get(item) }}</span>
    </div>
 </div>

</template>

<script setup lang='js'>

const itemsName = ['total','animation','game','learn','life','movie','music','photography'];

const map = new Map([['total', '综合'],
                     ['animation','动漫'],
                     ['game', '游戏'],
                     ['learn', '学习'],
                     ['life', '生活'],
                     ['movie','电影'],
                     ['music','音乐'],
                     ['photography','摄影'],
                   ]);
</script>

<style scoped>

.selector_item_container{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(235, 235, 235);
}


@keyframes hue {

from { filter: hue-rotate(0deg); }

to  { filter: hue-rotate(360deg); }

}

.selector_item{
    flex: 1;
    text-align: center;
    height: 60px;
    padding-top: 10px;
    padding-bottom: 15px;
    font-size: small;
    font-weight: 600;
}

.selector_item span{
    display: block;
}

.selector_item:hover{
    transition: 1s;
    background-color: rgb(240, 190, 88);
    cursor: pointer;
}
.selector_item{
    transition: 1s;
}
</style>