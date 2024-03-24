<template>

   <div class="article_wrap">
      <div class="article_container">
         <h1 class="title">{{ article_title }}</h1>
         <div class="placeholder_div" :style="`height:${placeholder_height}px`" ref="placeholder"></div>
         <div class="content">
            <li class="item" v-for="item in visualList" :key="item" ref="article_item">
               <div v-html="item.toString() + articleList[item]"></div>
            </li>
         </div>
      </div>

   </div>
</template>

<script setup lang='js'>
import { ref, onMounted } from 'vue'

const article_item = ref();

const list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

const placeholder = ref();
let itemHeight = 0;
let itemNum = 16;
let unvisualNum = 6;
let distanceFromTop = 0;
const placeholder_div = ref();
const placeholder_height = ref(0);
let placeholder_div_top = 0;
let scrollDist = 0;

let sign = true;
let start = 0;
let timeout = 0;

const visualList = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

window.onscroll = function () {
   scrollDist = window.scrollY;
   let blank = scrollDist - distanceFromTop - placeholder_height.value;
   if (blank >= 5 * itemHeight) {
      placeholder_height.value = blank - 5 * itemHeight;
      console.log(itemHeight);
      start = Math.ceil((scrollDist - distanceFromTop) / itemHeight) - 5;
      for (let i = 0; i < 16; i++) {
         visualList.value[i] = start + i;
      }
   }
}

// function proc(a, b){
//    start.value = Math.ceil((a - b) / itemHeight);
//    for(let i = 0; i < list.value.length; i++){
//       list[i] = start.value + i;
//    }
//    console.log(a, b);
//    timeout = 0;
// }

// window.onscroll = () => {
//    distanceFromTop = Math.ceil(window.scrollY);
//    if(distanceFromTop - placeholder_div_top > 0){
//       // let tmp = Math.ceil((distanceFromTop - placeholder_div_top - start.value * itemHeight));
//       // if(tmp > itemHeight * 3){
//       //    start.value = Math.ceil(distanceFromTop - placeholder_div_top);
//       // }
//       if(!timeout){
//          timeout = setTimeout(proc, 300, distanceFromTop, placeholder_div_top); //不能将number类型分配给null
//       }
//       console.log('start', start);
//    }
// }

// console.log('itemHeight', itemHeight);
//       distanceFromTop = window.scrollY;
//       const overflow = distanceFromTop - placeholder_div_top - placeholder_height.value;
//       console.log(overflow);
//       if (overflow > 3 * itemHeight) {
//          placeholder_height.value = overflow - 3 * itemHeight;

//       }
//       console.log('placeholder_height', placeholder_height.value);

// const props = defineProps(['article_url']);
// const html = ref();
// const article_title = ref('文章标题');

const articleList = new Array(500);
for (let i = 0; i < 500; i++) {
   articleList[i] = 'hello world' + i.toString();
}

// `<p>Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariaturlores sunt esse magni, ut, dignissimos.</p>
//     <p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>`
// function handleScroll() {
//    console.log(111);
//    slideWindow.value.forEach(item => item++);
// }

onMounted(() => {
   distanceFromTop = placeholder.value.offsetTop;
   itemHeight = article_item.value[0].offsetHeight;
   console.log(distanceFromTop);
})

</script>
<style scoped>
/* .article_board{
   width: 100%;
   height: 100%;
   background : linear-gradient(45deg, rgba(208, 57, 37, 0.8), rgba(29, 62, 194, 0.623)),
                linear-gradient(135deg,rgba(45, 196, 98, 0.8), rgba(201, 51, 116, 0.623));
   padding: 3px;
} */

.article_wrap {
   width: 100%;
   background: rgb(230, 230, 230);
   display: flex;
   flex-direction: column;
   text-align: center;
   justify-content: center;
}

.placeholder_div {}

.title {
   width: 80%;
   border-bottom: 2px solid rgb(227, 126, 126);
   margin: auto;
   margin-top: 30px;
}

.article_container {
   width: 80%;
   /* text-indent: 2px; */
   font-size: medium;
   background: rgb(255, 255, 255);
   margin: auto;
}

.item div {
   overflow: hidden;
   /* text-overflow: ellipsis; */
   display: -webkit-box;
   -webkit-line-clamp: 5;
   -webkit-box-orient: vertical;
   padding: 10px;
}

.item>>>p {
   margin: 0px;
}

li {
   list-style: none;
}
</style>