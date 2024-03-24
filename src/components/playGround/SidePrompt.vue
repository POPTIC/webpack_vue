<template>

    <div class="background_div">
        <h2>导航</h2>
        <nav class="navigater">
            <div class="personal">
                <div>
                    特别关注
                </div>
            </div>
            <div class="interest_area">
                <ul class="interest_item">
                    <li v-for='item of tags'>{{ item }}</li>
                </ul>
             </div>
             <MusicPlayer></MusicPlayer>
        </nav>
    </div>

</template>

<script setup lang='js'>
import {ref, reactive} from 'vue'
import MusicPlayer from '../playGround/MusicPlayer.vue';

// TODO: 兴趣标签做成圆形
const tags = ref(['animation','game','sport','learn','photograph']);
// TODO: 全局map映射
// tags.value返回的是reactive数组
console.log(tags.value)

</script>
<style scoped>

.background_div{
    background-color: white;
    margin-top: 10px;
    margin-left: 10px;
}

.fix_slide{
    position: fixed;
}

h2{
    width: 100%;
    height: 80px;
    background-color: rgba(239, 95, 95, 0.828);
    line-height: 80px;
    margin: 0px;
}

.personal{
    background-color: rgb(236, 175, 134);
    margin-right: 15px;
    padding: 5px;
    font-size: large;
    font-weight: 600;
    cursor: pointer;
}
.interest{
    display: flex;
}
.interest_item{
    margin: 0px;
    padding: 0px;
    padding-right: 35px;
    list-style: none;
    li{
        color: rgb(255, 255, 255);
        cursor: pointer;
        font-size: medium;
        font-weight: 600;
        height: 40px;
        line-height: 30px;
        border: 1px solid rgb(255, 255, 255);
        background-color: rgb(141, 194, 247);
        box-shadow: 0px 0px 5px rgb(242, 242, 242);
        transition: all 0.5s;
    };
    li:hover{
        transition: all 0.5s;
    }
    li:nth-child(1):hover{
        background-color: hsl(0, 100%, 80%);
    }
    li:nth-child(2):hover{
        background-color: hsl(50, 100%, 80%);
    }
    li:nth-child(3):hover{
        background-color: hsl(100, 100%, 80%);
    }
    li:nth-child(4):hover{
        background-color: hsl(150, 100%, 80%);
    }
    li:nth-child(5):hover{
        background-color: hsl(200, 100%, 80%);
    }

}


</style>./MusicPlayer.vue