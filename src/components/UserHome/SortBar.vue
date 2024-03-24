<template>

 <div> 

    <div class="sort_bar">
        <li>
            <input type="radio" :name="props.attach_name + 'vedio_sort_depend'" value="MOST_LIKE" checked><span>最多点赞</span>
        </li>
        <li>
            <input type="radio" :name="props.attach_name + 'vedio_sort_depend'" value="MOST_SAVE"><span>最多收藏</span>
        </li>
        <li>
            <input type="radio" :name="props.attach_name + 'vedio_sort_depend'" value="MOST_EARLY"><span>最新发布</span>
        </li>
    </div>
 </div>

</template>

<script setup lang='js'>

const props = defineProps(['attach_name']);

</script>
<style scoped>
li{
   list-style: none;
}
.sort_bar{
   /* TODO: 取消默认样式 */
   display: flow-root;
   justify-content: left;
   align-items: center;
   border-bottom: 3px solid blue;
   padding-top: 10px;
}
.sort_bar li{
   text-align: center;
   float: left;
   position: relative;
   margin: 0px;
   margin-left: 10px;
   margin-right: 10px;
}
.sort_bar li input{
   position: absolute;
   appearance: none;
   width: 100%;
   height: 100%;
   opacity: 0;
   z-index: 3;
   cursor: pointer;
   left: 0px;
}
.sort_bar li input ~span{
   font-weight: bold;
}
.sort_bar li input:checked ~span{
   color: rgba(0, 76, 255, 0.614);
   text-decoration:underline;
   font-weight: 600;
}
</style>