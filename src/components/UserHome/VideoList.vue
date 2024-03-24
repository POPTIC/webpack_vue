<template>

 <div> 
    <div class="distributed_video">
        <img :src="img_url[0]" class="img_container">
        <img :src="img_url[0]" class="img_container">
        <img :src="img_url[1]" class="img_container">
        <img :src="img_url[1]" class="img_container">
        <img :src="img_url[2]" class="img_container">
        <img :src="img_url[2]" class="img_container">
        <!-- <div class="img_container"></div>
        <div cass="img_container">
        <div class="img_container"><img :src="img_url[2]"></div> -->
    </div>
    <div>
        <PageSelector number='3'></PageSelector>
    </div>
 </div>

</template>

<script setup lang='js'>


import PageSelector from './PageSelector.vue';
// TODO: 设置vuex状态响应
const img_url = ['picture/banner_pic1.avif',
                'picture/banner_pic2.avif',
                'picture/banner_pic3.avif',
                'picture/banner_pic3.avif',
                'picture/banner_pic3.avif',
                'picture/banner_pic3.avif'];

</script>
<style scoped>
.distributed_video{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    margin: 10px
    /* 也可以用flex布局 */
}
.img_container{
    width: 100%;
    display: block;
    flex: 1;
}
</style>