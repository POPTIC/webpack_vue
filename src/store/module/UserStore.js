import * as LOGIN_TYPE from '../actionType/LoginType.js'
import * as INFO_TYPE from '../actionType/UserInfoType.js'
import { login, getUserInfo } from '../../connect/api.js'
import stateConfig from '../../connect/StateConfig.js'

const state = {
    userName: "poptic",
    email: "None",
    school: "None",
    birthday: "None",
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

const actions = { // 状态异步刷新钩子
    Login({ commit, state, rootState }, payload) {
        commit(LOGIN_TYPE.LOGIN_REQUEST, payload.userName);
        login(payload.userName, payload.password).then(
            (res) => {
                console.log(res);
                // 在这里出现了问题，在原来的设计中(return data.data)返回的是{token , id}所以会进入else分支，导致报出错误
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
    }
}


export default {
        state,
        getter,
        mutations,
        actions,
    }