<template>
    <div>
        <div class="page_selector">
            <button @click="backward"> < </button>
                <div v-for="item of dynamicPageList" :key="item">
                    <!-- v-for修改 -->
                    <button :class="{button_active : item == cur}" @click="cur = item.toString()">{{ item }}</button>
                </div>
            <button @click="forward"> > </button>
        </div>
    </div>
</template>

<script setup lang='js'>
import { ref, computed } from 'vue'

const props = defineProps(['number']);
const nums = ref(parseInt(props.number));
const cur = ref(1);
const dynamicPageList = computed(() => {
    const pageList = [];
    if(nums.value < 10){
        for(let i = 1; i <= nums.value; i++){
            pageList.push(i.toString());
        }
    }
    else{
        for(let i = 1; i < 5; i++){
            pageList.push(i.toString());
        }
        pageList.push('...');
        pageList.push(nums.value.toString());
    }
    return pageList;
});

function forward(){
    if(cur.value < dynamicPageList.value.length){
        cur.value++;
    }
}
function backward(){
    if(cur.value > 1){
        cur.value--;
    }
}

</script>
<style scoped>

.page_selector {
   display: flex;
   justify-content: center;
}

button {
    margin-left: 10px;
    margin-right: 10px;
    font-size: medium;
    font-weight: 600;
    border: 0px;
    background-color: white;
    color: rgba(56, 107, 248, 0.643);
    cursor: pointer;
}

button:hover{
    color: blue;
}

.button_active{
    color: blue;
}
</style>