<template>
    <div></div>
    <div class="banner">

    
        <div class="banner_buttons">
            <input type="radio" name="bannerItem" id="indicator1" checked hidden @click="(shift_banner('0'))()">
            <label for="indicator1"></label>
            
            <input type="radio" name="bannerItem" id="indicator2" hidden @click="(shift_banner('-100'))()">
            <label for="indicator2"></label>
            
            <input type="radio" name="bannerItem" id="indicator3" hidden @click="(shift_banner('-200'))()">
            <label for="indicator3"></label>
            
            <input type="radio" name="bannerItem" id="indicator4" hidden @click="(shift_banner('-300'))()">
            <label for="indicator4"></label>
    <!-- 可以使用:ref来绑定一个计算对象，从而可以动态往容器中添加ref对象 -->
        </div>
        <div class="banner_screen"> 
        <!-- 这个div是用来创建超出hidden效果的 -->
            <ul ref="block">
                <li @click="visit"></li>
                <li @click=""></li>
                <li @click=""></li>
                <li @click="">4</li>
            </ul>
        </div>
    </div>
    
    </template>
    
    
    <script setup lang='js'>
    import {ref} from 'vue'
    
    const block = ref();

    function shift_banner(offset){
        return (event)=>{
            block.value.style.marginLeft = offset + '%';
        }
    }
    
    // function visit(){
    //     window.open("https://www.baidu.com/");
    // } // 通过BOM对象来访问
    
    // TODO: 添加visit效果
    
    
    </script>
    <style scoped>
    
    .banner{
        position: relative;
        width: 500px;
        height: 300px;
        text-align: center;
    }
    
    .banner_screen{
        padding: 0px;
        /* padding会将元素中的子元素推开 */
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .banner ul{
        transition: all 0.5s;
        padding: 0px;
        margin: 0px;
        width: 400%;
        height: 100%;
        /* margin-left不会影响到子元素的长或宽 */
    }

    .banner li{
        width: 25%;
        height: 100%;
        list-style: none;
        float: left;
        line-height: 300px;
        font-size: 50px;
        background-position: center center;
        background-size: cover;
        cursor: pointer;
    }

    .banner_screen li:nth-of-type(1){
        background-image: url('/public/picture/banner_pic1.avif');
        background-color: hsl(0, 71%, 70%);
    }
    .banner_screen li:nth-of-type(2){
        background-image: url('/public/picture/banner_pic2.avif');
        background-color: hsl(50, 78%, 70%);
        /* margin-left: 100%; */
    }
    .banner_screen li:nth-of-type(3){
        background-image: url('/public/picture/banner_pic3.avif');
        background-color: hsl(100, 78%, 70%);
        /* margin-left: 200%; */
    }
    .banner_screen li:nth-of-type(4){
        background-color: hsl(150, 78%, 70%);
        /* margin-left: 300%; */
    }

    /* #indicator2:checked ~ ul{
        margin-left: -800px;
    }
    #indicator3:checked ~ ul{
        margin-left: -1600px;
    } */
    
    
    .banner_buttons{
        display: flex;
        position: absolute;
        top: 80%;
        left: 50%;
        z-index: 2;
    }
    
    label[for^="indicator"]{
        transition: background-color 0.5s;
        display: block;
        background-color: rgba(255, 255, 255, 0.799);;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 15px;
        cursor: pointer;
    }

    #indicator1:checked ~label[for='indicator1']{
        background-color: rgb(31, 141, 252);
    }
    #indicator2:checked ~label[for='indicator2']{
        background-color: rgb(31, 141, 252);
    }
    #indicator3:checked ~label[for='indicator3']{
        background-color: rgb(31, 141, 252);
    }
    #indicator4:checked ~label[for='indicator4']{
        background-color: rgb(31, 141, 252);
    }

    label:hover{
        box-shadow: 0px 0px 3px rgb(82, 138, 229);
        background-color: rgba(111, 63, 200, 0.403);
    }

    </style>