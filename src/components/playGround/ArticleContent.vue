<template>
    <div v-for="item of 4" class="article_item">
        <div class="header">
            <div class="user_info">
                <img :src="user_avatar" alt="no_image">
                <div class="personal_msg">
                    <span>UserName</span>
                    <span>2024-3-10 3:10</span>
                </div>
            </div>
            <div class="follow">
                <button :class="{user_focus : isFocus}">关注</button>
            </div>
        </div>
        <ArticleItem :content="user_article"></ArticleItem>
    </div>

</template>

<script setup lang='js'>
import { computed, ref } from 'vue'
import ArticleItem from './ArticleItem.vue';

const user_article = ref([`<p>Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariaturlores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
    <p>Adipisicing elit. Tempore tempora rerum..</p>`,
    `<p>hello world!</p>`]);

const user_avatar = ref('/picture/avatar.webp');

const isFocus = ref(true);


</script>
<style scoped>
.article_item {
    background-color: white;
    margin: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
}

.header {
    display: flex;
}

.user_info {
    flex: 1;
    display: flex;
}

.user_info img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.personal_msg {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.personal_msg span {
    display: block;
    margin: auto;
}

.personal_msg span:first-child {
    font-size: x-large;
    font-weight: 800;
}

.follow {
    flex: 2;
    line-height: 100px;
    text-align: right;
    /* 通过line-height设置行内元素的高度 */
}

button {
    border: none;
    background-color: rgba(254, 14, 14, 0.6);
    width: 60px;
    height: 30px;
    border-radius: 6px;
    font-size: large;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
button:hover{
    background-color: rgba(2, 31, 252, 0.5);
}

.user_focus{
    background-color: rgb(150, 150, 150);
}
.user_focus:hover{
    background-color: rgb(150, 150, 150);
}
</style>