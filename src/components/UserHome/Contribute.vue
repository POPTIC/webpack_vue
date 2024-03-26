<template>
   <div>
      <div class="contribute_page">
         <div class='class_selector'>
            <router-link to="/userhome/contribute/editor">
               <div class="video" :class="{ back_col: select_video }" @click="select_video = true">文章</div>
            </router-link>
            <router-link to="/userhome/contribute/uploader">
               <div class="article" :class="{ back_col: !select_video }" @click="select_video = false">视频</div>
            </router-link>
         </div>
         <div class="contribute_content">
            <RouterView></RouterView>
         </div>
      </div>
   </div>

</template>

<script setup lang='js'>

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