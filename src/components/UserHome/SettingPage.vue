<template>
    <div class="base_info_set">
        <form>
            <div>
                <!-- TODO: 添加类型检查正则 -->
                <span>用户名:</span>
                <input type="text" name="username">
            </div>
            <div>
                <span>密码:</span>
                <input type="password" name="passowrd">
            </div>
            <div>
                <span>毕业院校:</span>
                <input type="text" name="school">
            </div>
            <div>
                <span>邮箱:</span>
                <input type="email" name="birthday">
            </div>
            <div>
                <span>生日:</span>
                <input type="date" name="birthday">
            </div>

        </form>
        <div class="deco_canvas">
            <canvas width="300" height="200" ref="cav" @mouseover="play" @mouseout="stop">
            </canvas>
        </div>
    </div>


</template>

<script setup lang='js'>
import { onMounted,ref } from 'vue';
import Ball from '../../utils/ball';
let ball = null;
const cav = ref();
function play(){
    window.requestAnimationFrame(ball.update());
}
function stop(){
    window.cancelAnimationFrame(ball.getcallbackHandler());
}
onMounted(()=>{
    ball = new Ball(20, 20, 10, 'rgb(119, 70, 243)', 300, 200, 1, 1, cav.value);
});
</script>
<style scoped>
.base_info_set{
    background-color: rgb(240, 240, 240);
    display: flex;
    height: 300px;
    margin: 10px;
    justify-content: center;
}
form {
    font-weight: 600;
    background-color: white;
    flex: 1;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
input {
    display: block;
}

input {
    width: 200px;
    height: 25px;
}
.deco_canvas{
    background-color: white;
    margin: 10px;
    flex: 1;
    display: flex;
}
canvas{
    margin: auto;
    border: 3px solid rgb(7, 76, 251);
}

</style>../../utils/ball.js