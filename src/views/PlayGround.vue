<template>
    <div>
        <ClassSelector></ClassSelector>
        <div class="app_vedio_container">
            <div class="app_banner">
                <BannerSimple></BannerSimple>
            </div>
            <div class="app_content">
                <ViedoContent></ViedoContent>
            </div>
        </div>
        <SplitBand slogan="文章区"></SplitBand>
        <div class="app_article_content">
            <div class="app_side_prompt">
                <SidePrompt></SidePrompt>
            </div>

            <div class="app_article">
                <div>
                    <ArticleContent></ArticleContent>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang='js'>

import ClassSelector from '../components/playGround/ClassSelector.vue';
import BannerSimple from '../components/playGround/BannerSimple.vue';
import ViedoContent from '../components/playGround/ViedoContent.vue';
import SplitBand from '../components/playGround/SplitBand.vue';
import SidePrompt from '../components/playGround/SidePrompt.vue';
import ArticleContent from '../components/playGround/ArticleContent.vue';

</script>
<style scoped>

/* 视频区的样式 */

.app_vedio_container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 15px;
}
.app_banner{
  flex: 1;
  display: flex;
  padding-right: 20px;
  align-items: center;
  justify-content: center;
}
.app_content{
  flex: 1;
}

/* 文章区的布局 */

.app_article_content{
    display: flex;
    justify-content: space-around;
    background-color: rgba(230, 230, 230, 0.776);
  }
.app_article_content div:nth-child(1){
  flex: 1;
}
.app_article_content div:nth-child(2){
  flex: 2;
}

</style>