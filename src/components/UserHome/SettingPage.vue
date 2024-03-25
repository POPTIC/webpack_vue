<template>
    <div class="base_info_set">
        <div class="user_info">
            <div>
                <span>用户名:</span>
                <input type="text" name="username" v-model="username">
            </div>
            <div>
                <span>毕业院校:</span>
                <input type="text" name="school" v-model="school">
            </div>
            <div>
                <span>邮箱:</span>
                <input type="email" name="email" v-model="email">
            </div>
            <div>
                <span>生日:{{ birthday }}</span>
                <input type="date" name="birthday" v-model="birthday">
            </div>
            <div id="submit">
                <button @click="save">提交</button>
            </div>
        </div>
        <div class="deco_canvas">
            <canvas width="400" height="300" ref="cav" @mouseover="play" @mouseout="stop">
            </canvas>
        </div>
    </div>


</template>

<script setup lang='js'>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import Ball from '../../utils/ball';

const store = useStore();

// user form
let hasInput = computed(() => {
    if (username !== "" && school !== "" && email !== "" && birthday !== "") {
        return true;
    }
    else {
        false;
    }
})
let isChange = computed(() => {
    if (username !== store.state.UserStore.userName ||
        email !== store.state.UserStore.email ||
        school !== store.state.UserStore.school ||
        birthday !== store.state.UserStore.birthday) {
        return true;
    }
});
console.log(store.state);
const username = ref(store.state.UserStore.userName);
const school = ref(store.state.UserStore.school);
const email = ref(store.state.UserStore.email);
const birthday = ref(store.state.UserStore.birthday);
// watch(()=>birthday.value, console.log(birthday.value));
// watch(username, ()=>{
//     console.log(username.value);
//     // 注意watch的第二个参数为回调函数 —— console.log的返回值输出值不是一个函数
// });

// decoration
let ball = null;
const cav = ref();
function play() {
    window.requestAnimationFrame(ball.update());
}
function stop() {
    window.cancelAnimationFrame(ball.getcallbackHandler());
}

function save(){
    alert("保存成功");
}

onMounted(() => {
    ball = new Ball(20, 20, 10, 'rgb(119, 70, 243)', 400, 300, 1, 1, cav.value);
});

onBeforeUnmount(()=>{
    store.dispatch("Update");
})
</script>
<style scoped>
.base_info_set {
    background-color: rgb(240, 240, 240);
    display: flex;
    margin: 10px;
    justify-content: center;
}

form>div {
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
}

span,
div {
    display: block;
}

.user_info {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    width: 100%;
    background-color: white;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 30px;
}

.user_info>div {
    display: flex;
    justify-content: space-between;
}

input {
    width: 200px;
    height: 25px;
}

#submit {
    display: flex;
    justify-content: center;
}

#submit>button {
    font-weight: 600;
    appearance: none;
    outline: none;
    border: none;
    background-color: rgba(36, 168, 255, 0.8);
    border-radius: 5px;
    width: 80px;
    height: 30px;
}

#submit>button:hover {
    background-color: rgba(253, 155, 155, 0.9);
    transition: 0.3s;
}

#submit>button:active {
    background-color: rgba(255, 100, 100, 0.9);
}

.deco_canvas {
    background-color: white;
    margin: 10px;
    flex: 1;
    display: flex;
    padding: 30px;
}

canvas {
    margin: auto;
    border: 3px solid rgb(7, 76, 251);
}
</style>