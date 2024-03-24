<template>

   <div>
      <div class="login_board">
         <div class="login_title">
            <div :class="{ check: is_login, uncheck: !is_login }" @click="class_change">
               登录
            </div>
            <div :class="{ check: !is_login, uncheck: is_login }" @click="class_change">
               注册
            </div>
            <!-- 使用一个ref变量来实现轮播状态 -->
         </div>
         <form :class="{ change_layout: is_login }">
            <div class="wraper" :class="{ move_in: open_login }">
               <div class="login_item">
                  <CustomizedInput type="text" fill="please input your name" label="username" v-model="username">
                  </CustomizedInput>
               </div>
            </div>
            <div class="wraper" :class="{ move_in: open_login }">
               <div class="login_item">
                  <CustomizedInput type="email" fill="please input your email" label="email" v-model="email">
                  </CustomizedInput>
               </div>
            </div>
            <div class="wraper" :class="{ move_in: open_login }">
               <div class="login_item">
                  <CustomizedInput type="password" fill="please input your password" label="password"
                     v-model="password"></CustomizedInput>
               </div>
            </div>
         </form>
         <div class="button_wraper">
            <button class="login_button" @click="closeLogin">退出</button>
            <button class="login_button" @click="submit">提交</button>
         </div>

      </div>
   </div>

</template>

<script setup lang='js'>
import { computed, onMounted, ref, watch } from 'vue'
import CustomizedInput from '../playGround/CustomizedInput.vue';
import { useStore } from 'vuex';
import stateConfig from '../../connect/StateConfig';

const emit = defineEmits(['closeLogin']);
const store = useStore();

const username = ref();
const email = ref();
const password = ref();


const is_login = ref(true);
const open_login = ref(true);

const login_state = computed(() => {
   return store.state.id;
})

const register_state = computed(() => {
   return store.state.RegisterStore.register;
})


function closeLogin() {
   emit('closeLogin');
}

watch(login_state, () => {
   console.log(login_state);
   alert("登录成功")
   closeLogin();
})

function login() {
   console.log(password.value);
   store.dispatch('Login', { userName: username.value, password: password.value });
}

function register() {
   store.dispatch('Register');
}

function submit() {
   if (is_login.value) {
      login();
   }
   else {
      register();
   }
}


// const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{1,50}$/;
const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// watch(
//    username,
//    () => {
//       console.log(username.value);
//    } // watch是一个包装函数
// )


function debounce(task, t) {
   console.log('debounce create');
   let timeId = null;
   const ctx = this;
   const arg = arguments;
   return function () {
      if (timeId) {
         clearTimeout(timeId);
         timeId = setTimeout(task, t);
      }
      else {
         timeId = setTimeout(task, t);
      }
   }
}

// function echo(){
//    console.log(123);
// }

function check_name() {
   if (username.value !== '' && !is_login.value) {
      store.dispatch('CheckUserName', { userName: username.value });
   }
}
// 注意使用原型链的方法

function checkPasswordFormat() {
   if (!reg.test(password.value)) {
      if (password.value !== '' && !is_login.value) {
         alert('密码最少6位且为字母数字组合')
      }
   }
   console.log(reg.test(password.value));
}

onMounted(() => {
   watch(username, debounce(check_name, 600));
   watch(password, debounce(checkPasswordFormat, 600));
   watch(password, () => { console.log(password) });
   watch(register_state, () => {
      if (register_state === stateConfig.REGISTER_SUCCESS) {
         alert('注册成功');
         is_login.value = true;
      }
      else {
         alert('注册失败');
      }
   })

})

//TODO: 添加提交数据功能

// TODO: 实现账号密码表单传输的两种方式 - 使用组件间信息传递机制、使用vuex传递

// TODO: 实现格式检测，当格式检测通过时才会发送名字验证请求

function class_change() {
   is_login.value = !is_login.value;
}

</script>
<style scoped>
/* :root{
   --name--a:'aaa';
} */

.login_board {
   width: 400px;
   height: 230px;
   background-color: white;
   border: 3px solid rgb(105, 85, 239);
   border-radius: 10px;
   padding-top: 10px;
   padding-left: 20px;
   padding-right: 20px;
   overflow: hidden;
}

.login_title {
   padding-bottom: 10px;
   padding-top: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   /* align-items为垂直于轴方向上的对齐，原理为增加自适应的padding */
   justify-content: space-evenly;
   /* 多个item沿着轴对齐可以使用 */
}


.login_title>div {
   flex: 1;
   font-size: large;
   font-weight: bold;
   cursor: pointer;
   color: rgb(200, 200, 200);

}

.uncheck:hover {
   transition: all 0.5s;
   color: rgb(116, 116, 116);
}

.check {
   color: black !important;
}

.wraper {
   right: 500px;
   position: relative;
}


.wraper.move_in {
   right: 0px;
}


.wraper:nth-child(1) {
   position: relative;
   top: 0px;
   transition: all 0.5s;
}

.wraper:nth-child(2) {
   position: relative;
   transition: all 1s;
}

.wraper:nth-child(3) {
   position: relative;
   top: 0px;
   transition: all 1.5s;
}

.login_item {
   margin-bottom: 10px;
}

.change_layout .wraper:nth-child(1) {
   transition: all 1s;
   position: relative;
   top: 25px;
}

.change_layout .wraper:nth-child(2) {
   transition: all 1s;
   position: relative;
   right: 500px;
}

.change_layout .wraper:nth-child(3) {
   transition: all 1s;
   position: relative;
   top: -25px;
}

.button_wraper {
   text-align: center;
   display: flex;
   justify-content: space-evenly;
}

button.login_button {
   display: block;
   border: none;
   width: 100px;
   height: 30px;
   border-radius: 8px;
   color: rgb(80, 102, 244);
   font-weight: bolder;
   background-color: rgb(217, 243, 248);
   cursor: pointer;
}

button.login_button:hover {
   background-color: rgb(74, 245, 180);
}

/* h2{
   text-align: center;
} */
/* h2:before{
   color: blueviolet;
   content: var(--title);
} */
/* h2:after:hover{
   box-shadow: 1px 1px 2px red;
} */
</style>./playGround/CustomizedInput.vue../../connect/StateConfig../../connect/StateConfig../../connect/StateConfig