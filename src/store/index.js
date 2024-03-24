import { createStore } from 'vuex'
import UserStore from './module/userStore.js'
import GalleyStore from './module/galleyStore.js'
import RegisterStore from './module/registerStore.js'
import ChatroomStore from './module/chatroomStore.js'

// 引入模块可以不添加文件后缀


const state = {
  requesting: false,
  id : -1,
  userName : "poptic",
  error: {}
}

const getters = {
  requesting: state => state.requesting,
  error: state => state.error,
  userId: state => id,
}

export default createStore({
  state,
  getters,
  modules: {
    UserStore,
    GalleyStore,
    RegisterStore,
    ChatroomStore,
  }
})
