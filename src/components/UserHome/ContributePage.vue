<template>
      <div class="contribute_page">
         <div class='class_selector'>
            <router-link to="/userhome/contribute/video">
               <div style="height: 35px;"></div>
               <div class="video" :class="{ back_col: select_video }" @click="select_video = true">视频</div>
            </router-link>
            <router-link to="/userhome/contribute/article">
               <div class="article" :class="{ back_col: !select_video }" @click="select_video = false">文章</div>
            </router-link>
         </div>
         <!-- TODO: 这里的名字需要解耦合 -->
         <div class="contribute_content">
            <SortBar attach_name="contribute"></SortBar>
            <RouterView></RouterView>
         </div>
         <!-- <div class="distributed_article">
         <ArticleList></ArticleList>
    </div> -->
      </div>

</template>

<script setup lang='js'>

import SortBar from './SortBar.vue';
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const select_video = ref(true);

</script>
<style scoped>
.contribute_page {
   display: flex;
   margin: 10px;
   background-color: white;
}

.class_selector {
   flex: 1;
}

.video,
.article {
   width: 80%;
   float: left;
   cursor: pointer;
   padding: 10%;
   font-weight: 600;
   font-size: large;
}

:where(.video, .article):hover {
   background-color: rgb(220, 220, 220);
}

.contribute_content {
   flex: 4;
}

.back_col {
   background-color: rgba(131, 131, 253, 0.642);
}
</style>