// TODO: 需要修改
import * as TYPE from '../actionType/ChatroomType.js'
import { getFriendList, getMessage } from '../../connect/api.js'
import stateConfig from '../../connect/StateConfig.js'

const state = {
    friendList: [], // avatar \ name 
    message: {}, // 键对应于朋友名称、值对应于信息项 - [flag, msg, timestrape]
}

const getter = {
    friendList: (state) => state.friendList,
}

const mutations = {
    [TYPE.FRIEND_lIST_REQUEST]() {
        console.log("正在获取朋友列表");
    },
    [TYPE.FRIEND_LIST_SUCESS](state) {
        console.log("朋友列表获取成功");
    },
    [TYPE.FRIEND_LIST_FAILURE]() {
        console.log("朋友列表获取失败");
    },

    [TYPE.FRIEND_MESSAGE_REQUEST]() {
        console.log("获取朋友信息");
    },
    [TYPE.FRIEND_MESSAGE_FAILURE]() {
        console.log("获取信息失败");
    },
    [TYPE.FRIEND_MESSAGE_SUCESS]() {
        console.log("获取信息成功");
    },
}

const actions = { // 状态异步刷新钩子
    GetFriendList({ commit, state }, payload) {
        commit(TYPE.FRIEND_lIST_REQUEST);
        getFriendList(payload.userName).then(
            (res) => {
                // 在这里出现了问题，在原来的设计中(return data.data)返回的是{token , id}所以会进入else分支，导致报出错误
                if (res.code === stateConfig.SUCCESS) {
                    commit(TYPE.FRIEND_LIST_SUCESS);
                    // 这里拿到的直接的数据为proxy格式的，因此不可以直接赋值给状态
                    state.friendList = res.data.friend;
                    for (let item of res.data.friend) {
                        state.message[item.name] = [];
                    }
                }
                else {
                    commit(TYPE.FRIEND_LIST_FAILURE);
                }
            },
            (err) => {
                console.log(err);
                commit(TYPE.FRIEND_LIST_FAILURE);
            }
        )
    },
    GetFriendMessage({ commit, state, rootState }, payload) {
        commit(TYPE.FRIEND_MESSAGE_REQUEST);
        getMessage(payload.userName).then(
            (res) => {
                if (res.code === stateConfig.SUCCESS) {
                    commit(TYPE.FRIEND_MESSAGE_SUCESS);
                    console.log(res.data[0].from)
                    for (let item of res.data) {
                        if (item.from === rootState.userName) {
                            for (let msg of item.info){
                                state.message[item.to].push([stateConfig.FROM_USER, msg[0], msg[1]]);
                            }
                        }
                        else{
                            for (let msg of item.info){
                                state.message[item.from].push([stateConfig.TO_USER, msg[0], msg[1]]);
                            }
                        }
                    }
                    for(let item of state.friendList){
                        console.log("item", state.message[item.name]);
                        state.message[item.name].sort((p, q) => {
                            return p[2] - q[2];
                        })
                    }
                }
                else{
                    commit(TYPE.FRIEND_MESSAGE_FAILURE);
                }
            },
            (err) => {
                console.log(err);
                commit(TYPE.FRIEND_MESSAGE_FAILURE);
            }
        )
    },
    // SendMessage({ commit, state, rootState }, payload){
    //     commit(TYPE.SEND_MESSAGE_REQUEST);
        
    // }
}

export default {
    state,
    getter,
    mutations,
    actions,
}