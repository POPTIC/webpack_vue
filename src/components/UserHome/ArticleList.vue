<template>

 <div class="article_list">
    <div class="article_item" v-for="item of 2" :key="item">
        <div class="article_title">title</div>
        <div class="article_content" v-html="article[0]">
        </div>
        <!-- 添加了v-html后就不能再在块内添加html了 -->
        <div class="expand"><button>展开</button></div>
    </div>
 </div>

</template>

<script setup lang='js'>

import {ref} from 'vue'


const article = ref([`<p>Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariaturlores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
    <p>Adipisicing elit. Tempore tempora rerum..</p>`,
   `<p>hello world!</p>`]);

// 在update阶段来渲染
</script>
<style scoped>
.article_title{
    font-size: larger;
    font-weight: bolder;
}
.article_item{
    border: 3px solid red;
    margin: 10px;
    border-radius: 8px;
    padding: 10px;
}

.article_content{
    text-align: center;
    font-size: large;
    font-weight: 500;
    text-align: left;
    overflow : hidden;
    /* text-overflow: ellipsis; */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

.article_content >>>  p{
    display: inline-block;
    text-align: left;
    margin: 0px;
}
.expand{
    text-align: right;
    padding-right: 30px;
}
.expand > button{
    font-size: medium;
    font-weight: 600;
    border: none;
    background-color: white;
    cursor: pointer;
    color: rgba(90, 18, 234, 0.602);
}
.expand > button:hover{
    color: rgb(204, 85, 34);
}

</style>