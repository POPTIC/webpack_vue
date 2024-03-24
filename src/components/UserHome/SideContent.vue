<template>
    <div>
        <div class="side_content">
            <div class="personal_msg">
                <div class="personal_msg_title">
                    <span>个人资料</span>
                </div>
                <div class="personal_msg_email">
                    <span>ID：{{ userId }}</span>
                </div>
                <div class="personal_msg_school">
                    <span>生日：{{  }}</span>
                </div>
                <div class="user_id">
                    <span>邮箱：{{  }}</span>
                </div>
                <div class="user_birthday">
                    <span>毕业院校：{{  }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='js'>

import { useStore } from 'vuex';
import {computed} from 'vue';

const store = useStore();
const userId = computed(() => {
    store.getters.id;
}) 

</script>
<style scoped>
.side_content{
   flex-direction: column;
   align-items: center;
   flex: 2;
   padding: 10px;
}
.personal_msg{
   width: 100%;
   box-sizing: content-box;
   background-color: white;
   display: flex;
   flex-direction: column;
   /* flex布局的副作用是将 */
   /* justify-content: space-evenly;
   align-items:start; */
}
.personal_msg div:first-child{
   text-align: center;
   font-size: large;
   font-weight: bold;
}
.personal_msg > div{
   text-align: left;
   font-weight: 600;
   margin: 30px;
}
</style>