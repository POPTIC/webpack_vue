<template>
    <div class="login_wraper" v-show="loginOpen">
        <Login class="login_comp" @closeLogin="closeLoginBox"></Login>
    </div>
    <div class="header_container">
        <div class="navigater">
            <li>
                <RouterLink to="/playground" class='router_link'><span>首页</span></RouterLink>
            </li>
            <li><router-link to="/hot" class='router_link'><span>热门</span></router-link> </li>
        </div>
        <div class="input_decorator">
            <input class="input_box" placeholder="请输入内容" @focus="change" @blur="change">
            <div class="promote_box" v-show="expand">
                <li class="title">
                    <span>热榜</span>
                    <!-- 这里可以通过flex或 -->
                </li>
                <!-- TODO: 这里设置一个阶梯弹出画面 -->
                <div class="content_board">
                    <div class="content">
                        <!-- TODO: 这里需要改变数字的颜色 -->
                        <li><span>1</span><span>content</span></li>
                        <li><span>2</span><span>content</span></li>
                        <li><span>3</span><span>content</span></li>
                        <li><span>4</span><span>content</span></li>
                    </div>
                    <div class="content">
                        <li><span>5</span><span>content</span></li>
                        <li><span>6</span><span>content</span></li>
                        <li><span>7</span><span>content</span></li>
                        <li><span>8</span><span>content</span></li>
                    </div>
                </div>
            </div>
        </div>
        <div class="user_item">
            <div class="login">
                <span v-show="!login" @click="openLoginBox">登录</span>
                <img v-show="login" alt="aaa">
            </div>
            <div><router-link to="/userhome/main" class='router_link'><span>主页</span></router-link></div>
            <div><router-link to="/chatroom" class='router_link'><span>消息</span></router-link></div>
        </div>
    </div>
    <RouterView></RouterView>
</template>

<script setup lang='js'>

import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router';
import Login from '../components/playGround/Login.vue';

// showLogin
const loginOpen = ref(false);
function openLoginBox() {
    loginOpen.value = true;
}
function closeLoginBox() {
    console.log('login box close');
    loginOpen.value = false;
}

const emit = defineEmits(['showLogin']);


const expand = ref(false);
function change() {
    expand.value = expand.value ? false : true;
}

const login = ref(false); // 这里要设置为全局状态
const showLogin = ref(false);

</script>
<style scoped>
/* :root {
    --item_space: 10px;
} */

.router_link {
    text-decoration: none;
    color: white;
}

.login_wraper {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    background-color: rgba(130, 130, 130, 0.616);
}

.login_comp {
    position: absolute;
    top: 230px;
    left: 420px;
}

.header_container {
    width: 100%;
    height: 70px;
    display: flex;
    background: linear-gradient(45deg, rgba(205, 48, 48, 0.854), rgba(98, 29, 235, 0.949));
    /* animation: hue 6s linear infinite; */
    align-items: center;
}

.navigater {
    flex: 1;
    padding: 6px;
    display: flex;
    align-items: center;
}

.navigater li {
    list-style: none;
    padding: 10px;
    flex: 1;
}

.navigater span {
    color: aliceblue;
    font-size: large;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
}

.input_decorator {
    flex: 2;
    width: 82%;
    height: 30px;
    position: relative;

}

.input_box {
    width: 80%;
    display: block;
    height: 100%;
    margin-left: 10%;
    /* margin-right: 7%; */
    /* 这里设置margin-right没有作用，因为没有触及到右边元素的边界区域 */
    padding-left: 2%;
    border: none;
    background-color: rgb(230, 230, 230);
    border-radius: 5px 5px 5px 5px;
}

.input_box:focus {
    outline: 0px;
    caret-color: rgb(177, 225, 17);
    background-color: rgb(255, 255, 255);
    border-radius: 5px 5px 0px 0px;
    border-bottom: 1px rgb(227, 227, 227) solid;
}

.input_box:focus~div {
    display: block;
}

.input_box:hover {
    background-color: rgb(255, 255, 255);
}

.promote_box {
    display: flex;
    box-sizing: content-box;
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
    position: absolute;
    padding: 1%;
    background-color: rgba(5, 1, 255, 0.487);
    z-index: 3;
}

.promote_box li {
    list-style: none;
}

.title {
    font-size: larger;
    text-align: left;
    font-weight: 600;
    padding-left: 10px;
    color: brown;
    background-color: rgb(225, 225, 225);
}

.content_board {
    display: flex;
    background-image: url('/public/picture/dnf.webp');
    background-position: center center;
    background-size: cover;
}

.content {
    flex: 1;
}

.content li {
    display: flex;
    transition: 0.3s;
    cursor: pointer;
}

.content li span {
    font-size: large;
    font-weight: bold;
}

.content li span:nth-child(1) {
    margin-left: 10px;
}

/* 控制子span的间距 */
.content li span:nth-child(2) {
    margin-left: 15px;
}

.content li:nth-child(even) {
    font-weight: 500;
    background-color: rgb(197, 152, 244);
}

.content li:nth-child(odd) {
    font-weight: 500;
    background-color: rgb(238, 162, 104);
}

.content li:hover {
    background: rgba(36, 53, 208, 0.755);
}

.user_item {
    flex: 1;
    display: flex;
    justify-content: center;
}

/* .user_item div:last-child{
    padding-left: 30px;
}
.user_item div:last-child{
    padding-left: 30px;
    padding-right: 0px;
} */
/*
.personal_page{
    padding-left: 30px;
    padding-right: 0px;
} */
.user_item>div {
    flex: 1;
    padding: 10px;
    font-size: large;
    font-weight: 600;
    color: white;
}

.login>span {
    cursor: pointer;
}
</style>