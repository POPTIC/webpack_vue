<template>

 <div class="event_check">
    <div class="title">
        待办事项
    </div>
    <div class="list">
        <div :key="index" v-for="(item, index) in eventList" class="item_block">
            <input type="checkbox" :id="item + index" :ref="(el) => add_ref(el)"> <p> {{ item }} </p> 
            <!-- 使用:后属性即可用表达式赋值 -->
        </div>
    </div>

</div>

</template>

<script setup lang='js'>

import {ref, onMounted} from 'vue';

let itemList = [];

const eventList = ref([
    "hello",
    "world",
    "aaa",
    "bbb",
    "ccc"
]);

function add_ref(item){
    itemList.push(item);
}

let lastSelect = null;

function add_shift_action(e){
    // js监听事件出现在默认点击checked事件之后
    // 注意js事件流
    // *** 
    // --- 如果监听的是父元素，父元素的监听事件会先发生，子元素的监听事件或默认事件（checkBox的点击响应）会后发生
    // --- 如果监听一个元素，则监听事件会在该元素默认事件执行后再执行监听事件
    if(e.shiftKey && this.checked){
        
        let toChecked = false;
        console.log(toChecked);
        if(lastSelect !== null && lastSelect.checked){
            itemList.forEach((item) => {
                if(item === this || item === lastSelect){
                    toChecked = !toChecked;
                }
                if(toChecked){
                    item.checked = true;

                }
                
            })
        }
    }
    lastSelect = this;
}

onMounted(()=>{
    itemList.forEach((item) => {
        item.addEventListener('click', add_shift_action);
    })
})

</script>
<style>


.title{
    margin-top: 10px;
    margin-left: 10px;
    font-size: larger;
    font-weight: 600;
    text-align: left;
}

.list{
    background-color: lightskyblue;
}

.item_block{
    display: flex;
    border-bottom: solid 1px black;
    align-items: center;
}

input[type="checkbox"]{
    margin: 20px;
    
}
.item_block > p{
    border-left: 2px solid rgb(39, 35, 157);
    padding: 20px;
    margin: 0px;
    /* margin设置为0的作用是为了让border线贯穿整个元素 */
    /* border线不贯穿整个元素是因为存在margin，border线在margin区域内部 */
    font-weight: 600;
    text-align: left;
    font-size: large;
    flex: 1;
}
input[type='checkbox']:checked + p{
    text-decoration: line-through;
    background-color: rgba(0, 126, 252, 0.756);
    font-weight: 600;
}
.item_block:last-child{
    border-bottom: 3px solid red ;
}
.item_block:first-child{
    border-top: 3px solid slateblue;
}

</style>