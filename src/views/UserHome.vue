<template>

   <div class="container">
      <div class="header">
         <div class="top">
            <div class="user_info">
               <img class="user_img" :src="user_img_url">
               <div class="other_msg">
                  <p>{{ user_name }}</p>
                  <input placeholder="请输入签名">
               </div>
            </div>
            <div class="contribute"><router-link to="/userhome/contribute/editor" class="link"><button @click="get_left = false; get_right = false">投稿</button></router-link></div>
         </div>
         <div class='navigater'>
            <div class='selector'>
               <router-link to="/userhome/main" class="link">
                  <div @click="get_left = true; get_right = false">主页</div>
               </router-link>
               <router-link to="/userhome/show" class="link" @click="get_left = false; get_right = false">
                  <div>展示</div>
               </router-link>
               <router-link to="/userhome/workcollection/video" class="link" @click="get_left = false; get_right = true">
                  <div>作品</div>
               </router-link>
               <router-link to="/userhome/setting" class="link" @click="get_left = false; get_right = true">
                  <div>设置</div>
               </router-link>
            </div>
            <div class='user_msg'>
               <router-link to="/userhome/user_list" class="link">
                  <div @click="get_left = true; get_right = false">关注</div>
               </router-link>
               <router-link to="/userhome/user_list" class="link">
                  <div @click="get_left = true; get_right = false">粉丝</div>
               </router-link>
            </div>
         </div>
      </div>
      <div class="content">
         <div class="left_side_content" v-show="get_right">
            <RouterView name="left"></RouterView>
         </div>
         <div class="main_content">
            <RouterView name="main"></RouterView>
         </div>
         <div class="right_side_content" v-show="get_left">
            <RouterView name="right"></RouterView>
         </div>
      </div>
   </div>
</template>

<script setup lang='js'>
import { ref, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

// const emit = defineEmits(["routeToEditor"]);

const user_img_url = ref('src/assets/picture/avatar.webp');
const get_left = ref(true);
const get_right = ref(false);

const user_name = computed(() => {
   return "poptic";
});

// function route(){
//    emit("routeToEditor");
// }

</script>
<style scoped>
.link {
   text-decoration: none;
   /* 去除下划线 */
   color: rgb(0, 0, 0);
   font-size: large;
}

/* TODO: 做下划线滑动效果 */
.link:hover {
   color: rgba(90, 46, 191, 0.841);
   cursor: pointer;
}

.container {
   background-color: rgba(220, 220, 220, 0.712);
}

.header {
   background-color: rgb(94, 162, 251);
}
.top{
   display: flex;
   justify-content: space-between;
}
.user_info {
   display: flex;
   flex: 3;
}
.contribute{
   display: flex;
   justify-content: center;
   align-items: center;
   flex: 1;
}
.contribute button{
   outline: none;
   border: none;
   background-color: rgba(73, 45, 255, 0.561);
   width: 60px;
   height: 30px;
   border-radius: 8px;
   font-size: 15px;
   font-weight: 500;
}

.contribute button:hover{
   background-color: rgba(0, 0, 255, 0.564);
}

.user_img {
   width: 80px;
   height: 80px;
   border-radius: 50%;
}

.other_msg>p {
   text-align: left;
   padding-left: 15px;
   margin-bottom: 5px;
   font-weight: 800;
}

.other_msg>input {
   outline: none;
   border: none;
   background-color: rgba(255, 255, 255, 0);
   transition: all 0.3s ease;
   width: 300px;
   margin-left: 5px;
   color: rgba(0, 0, 255, 0.7);
}

.other_msg>input::placeholder {
   color: rgba(0, 0, 255, 0.7);
   font-weight: 600;
}

.other_msg>input:focus {
   outline: none;
   outline: 1px solid grey;
   border-radius: 3px;
   background-color: rgba(240, 248, 255, 0.695);
}

.other_msg>input:hover {
   outline: none;
   outline: 1px solid grey;
   border-radius: 3px;
   background-color: rgba(240, 248, 255, 0.695);
}

.navigater {
   font-size: medium;
   font-weight: 600;
   display: flex;
   justify-content: space-between;
   /* 如果子元素没有设置flex则不会拉伸 */
   align-items: center;
   padding-top: 15px;
   padding-bottom: 15px;
   background-color: white;
}

.selector {
   display: flex;
   justify-content: space-evenly;
   flex: 5;
}

.user_msg {
   display: flex;
   justify-content: space-evenly;
   flex: 2;
   cursor: pointer;
}

.content {
   width: 100%;
   height: 100%;
   display: flex;
   background-color: rgb(240, 240, 240);
}

.main_content {
   margin-top: 10px;
   flex: 5;
   height: 100%;
   background-color: white;
}

.right_side_content {
   flex: 2;
}

.article_list {
   margin-bottom: 5px;
}
</style>