<template>

    <div class="user_List_container">
        <div v-for="(item, index) of 10" :key="item" class="user_list_item">
            <div class="left_block">
                <img :src="img_url">
                <div class="user_info">
                    <div class="user_name">
                        {{ user_name }}
                    </div>
                    <div class="personal_introduction">
                        {{ introduction }}
                    </div>
                </div>
            </div>
            <div class="button_wraper">
                <button :class="{button_active : isActive[index]}" @click="isActive[index] = !isActive[index]">关注</button>
            </div>
            
        </div>
    </div>
<!-- TODO: 设置切换粉丝、关注表后触发的数据获取 -->
</template>

<script setup lang='js'>
import { ref } from 'vue';

const img_url = ref('/picture/avatar.webp');
const user_name = ref('alien');
const introduction = ref('hello world');

const isActive = ref(new Array(10).fill(false));


</script>
<style scoped>
.user_List_container {
    background-color: white;
    padding: 15px;
    margin-left: 10px;
}

img {
    width: 50px;
    height: 50px;
}

.user_name {
    font-size: large;
    font-weight: bold;
}

.personal_introduction {
    font-size: medium;
    font-weight: 500;
    color: rgb(100, 100, 100);
}

.left_block {
    display: flex;
}
.user_list_item{
    display: flex;
    justify-content: space-between;
}
.user_info {
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
}

.button_wraper{
    display: flex;
    justify-content: center;
    align-items: center;
}
button{
    border: none;
    width: 80px;
    cursor: pointer;
    background-color: rgba(165, 165, 165, 0.8);
    font-weight: 600;
}
.button_active{
    background-color: rgba(235, 235, 235, 0.8);
    border: 1px solid rgb(186, 186, 248);
    font-weight: 100;
}
button.button_active:hover{
    background-color: rgba(235, 235, 235, 0.8);
    color: rgb(81, 81, 255);
    border: 1px solid blue;
}



</style>