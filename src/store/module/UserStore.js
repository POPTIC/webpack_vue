import * as LOGIN_TYPE from '../actionType/LoginType.js'
import * as INFO_TYPE from '../actionType/UserInfoType.js'
import { login, getUserInfo,updateUserInfo } from '../../connect/api.js'
import stateConfig from '../../connect/StateConfig.js'

const state = {
    userName: "poptic",
    email: "None",
    school: "None",
    birthday: "2024-03-25",
}

const getter = {
    name: (state) => state.userName,
    email: (state) => state.email,
    school: (state) => state.school,
    birthday: (state) => state.birthday,
}

const mutations = {
    [LOGIN_TYPE.LOGIN_REQUEST](state, data) {
        state.userName = data.userName;
        console.log("正在登录");
    },
    [LOGIN_TYPE.LOGIN_SUCESS](state) { // 可以看作是同步代码
        console.log("登录成功");
    },
    [LOGIN_TYPE.LOGIN_FAILURE](state) {
        state.userName = "";
        console.log("登录失败");
    },

    [INFO_TYPE.GET_USER_INFO_REQEUST](state) {
        console.log("正在获取个人信息");
    },
    [INFO_TYPE.GET_USER_INFO_SUCESS](state, data) {
        email = data.email;
        school = data.school;
        birthday = data.birthday;
        console.log("获取个人信息成功");
    },
    [INFO_TYPE.GET_USER_INFO_FAILURE](state) {
        state.userName = "";
        console.log("获取个人信息失败");
    },
}

const actions = {
    Login({ commit, rootState }, payload) {
        commit(LOGIN_TYPE.LOGIN_REQUEST, payload.userName);
        login(payload.userName, payload.password).then(
            (res) => {
                console.log(res);
                if (res.code === stateConfig.SUCCESS) {
                    commit(LOGIN_TYPE.LOGIN_SUCESS);
                    console.log(res);
                    rootState.userName = payload.userName;
                    rootState.id = res.data.id;
                }
                else {
                    commit(LOGIN_TYPE.LOGIN_FAILURE);
                }
            }
            , () => {
                commit(LOGIN_TYPE.LOGIN_FAILURE);
            }
        );
    },
    GetUserInfo({ commit, state, rootState }, payload) {
        commit(INFO_TYPE.GET_USER_INFO_REQEUST);
        getUserInfo.then(rootState.id).then(
            (res) => {
                console.log(res);
                if (res.code == stateConfig.SUCCESS) {
                    commit(INFO_TYPE.GET_USER_INFO_SUCESS, res.data);
                }
                else {
                    console.log(res.msg);
                    commit(INFO_TYPE.GET_USER_INFO_FAILURE);
                }
            },
            (err) => {
                commit(INFO_TYPE.GET_USER_INFO_FAILURE);
            }
        )
    },
    UpdateUserInfo({commit}, payload){
        commit(INFO_TYPE.UPDATE_USER_INFO_REQUEST);
        updateUserInfo(payload).then(
            (data)=>{
                if(data.code === SUCCESS){
                    commit(INFO_TYPE.UPDATE_USER_INFO_SUCESS);
                    console.log("发送成功");
                }
                else{
                    commit(INFO_TYPE.UPDATE_USER_INFO_FAILURE);
                    console.log(data.message);
                }
            },
            (err)=>{
                commit(INFO_TYPE.UPDATE_USER_INFO_FAILURE);
                console.log(err);
            }
        )
        
    }
}


export default {
        state,
        getter,
        mutations,
        actions,
    }