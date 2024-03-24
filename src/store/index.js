import { createStore } from 'vuex'
import UserStore from './module/UserStore.js'
import GalleyStore from './module/GalleyStore.js'
import RegisterStore from './module/RegisterStore.js'
import ChatroomStore from './module/ChatroomStore.js'

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
