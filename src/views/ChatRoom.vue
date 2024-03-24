<template>
    <div class="chat_room">
        <div class="container">
            <div class="chat_header">
                <img :src="user_avatar">
            </div>
            <div class="chat_main">
                <div class="friend_list">
                    <div class="fiend_item" v-for="{ avatar, name } in friend_list" @click="active_friend = name"
                        :key="name">
                        <img :src="avatar">
                        <span>{{ name }}</span>
                    </div>
                </div>
                <div class="chat_area">
                    <div class="chat_content">
                        <div v-for="item of message_list[active_friend]" class="chat_item"
                            :class="{ chat_item_left: item[0] === 1, chat_item_right: item[0] === 0 }">
                            {{ item[1] }}
                        </div>
                    </div>
                    <div class="chat_input">
                        <textarea type="text" v-model="message" class="input_box"></textarea>
                        <button class="submit" @click="submit">发送</button>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang='js'>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { chatUrlRoot } from '../connect/URLconfig'
import { io } from 'socket.io-client';

const store = useStore();
const message = ref();

const active_friend = ref("");


const friend_list = computed(() => {
    return store.state.ChatroomStore.friendList;
})

const message_list = computed(() => {
    return store.state.ChatroomStore.message;
})

const chat_url = `${chatUrlRoot}?userName=${store.state.UserStore.userName}`;
const socket = io(chat_url, {
    transports: ['websocket'], // 指定传输方式，如WebSocket
    autoConnect: true, // 是否自动连接
    reconnection: true, // 是否自动重新连接
    reconnectionAttempts: 3, // 重新连接尝试次数
    reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
    // 其他可选参数...
});
socket.emit('connection', "hello world");

socket.on('echo', (data) => {
    console.log(data);
});

function submit(){
    console.log(111);
    const data = {
        from : store.state.userName,
        to : active_friend.value,
        message : message.value,
    }
    socket.emit("sendmsg", data);
}



const user_avatar = ref('/picture/avatar.webp');

onMounted(() => {
    store.dispatch('GetFriendList', { userName: store.state.UserStore.userName });
    store.dispatch('GetFriendMessage', { userName: store.state.UserStore.userName });
})

</script>
<style scoped>
.chat_room {
    background-color: rgb(230, 230, 230);
    background-image: url('/public/picture/charroombackground.jpeg');
    background-size: cover;
    background-position: center center;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 800px;
}

.chat_header {
    font-size: xx-large;
    font-weight: 600;
    line-height: 60px;
    height: 60px;
    background-color: rgba(18, 117, 255, 0.676);
}

div.chat_header {
    text-align: left;
}

div.chat_header img {
    margin-left: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.chat_main {
    flex: 5;
    display: flex;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.795);
}

.friend_list {
    flex: 2;
    background-color: rgba(230, 230, 230, 0.6);
    border-right: 3px solid rgba(102, 95, 250, 0.782);
}

.fiend_item {
    transition: all 0.5s ease;
    font-size: medium;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
}

.fiend_item:hover {
    transition: all 0.3s ease;
    background-color: rgb(170, 170, 255);
}

div.fiend_item span {
    display: block;
}

div.fiend_item img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.chat_area {
    flex: 5;
    display: flex;
    flex-direction: column;
}

.chat_content {
    flex: 6;
    overflow: scroll;
    background-color: rgba(255, 255, 255, 0.78);
    display: flex;
    flex-direction: column;
}

.chat_input {
    position: relative;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.073);
}

.input_box {
    display: block;
    height: 100%;
    outline: none;
    border: 0px;
    padding: 0px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.073);
    font-size: x-large;
    resize: none;
}

/* 滑动条样式设置 */
.chat_content::-webkit-scrollbar {
    width: 8px;
}

.chat_content::-webkit-scrollbar-thumb {
    background-color: rgba(75, 119, 250, 0.649);
}

.chat_content::-webkit-scrollbar-track {
    background-color: transparent;
}

.chat_content::-webkit-scrollbar-corner {
    display: none;
}

.chat_item {
    text-align: left;
    padding: 10px;
    padding-left: 10px;
    font-size: large;
    font-weight: bold;
}

.chat_item_left {
    flex: 1;
    text-align: left;
    color: rgb(255, 111, 0);
}

.chat_item_right {
    flex: 1;
    text-align: right;
    color: blue;
}

.submit {
    position: absolute;
    width: 50px;
    height: 20px;
    border: 0px;
    border-radius: 5px;
    background-color: rgba(12, 57, 240, 0.6);
    font: 300;
    top: 30px;
    right: 10px;
    z-index: 100;
    font-weight: 500;
}

.submit:active {
    background-color: rgb(12, 58, 240);
}
</style>