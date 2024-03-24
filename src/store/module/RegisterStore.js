// TODO: 需要修改
import * as TYPE from '../actionType/RegisterType.js'
import { isNameExist,register } from '../../connect/api.js'
import stateConfig from '../../connect/StateConfig.js'

const state = {
    requesting : stateConfig.NOT_REQUEST,
    checkSign : stateConfig.NOT_REPEAT,
    register : stateConfig.NOT_REQUEST,
}
const getter = {
    reqState : (state) => state.requesting,
    check : (state) => state.checkSign,
    regState : (state) => state.register,
}
const mutations = {
    [TYPE.CHECK_REQUEST](state){
        state.requesting = stateConfig.REQUESTING;
        console.log("正在检查命名是否重复");
    },
    [TYPE.NOT_REPEAT](state){
        state.requesting = stateConfig.REQUESTING_SUCESS;
        state.checkSign = stateConfig.NOT_REPEAT;
        console.log("命名不重复");
    },
    [TYPE.NAME_REPEAT](state){
        state.requesting = stateConfig.REQUESTING_SUCESS;
        state.checkSign = stateConfig.REPEAT;
        console.log("命名重复");
    },
    [TYPE.CHECK_FAILURE](state){
        state.requesting = stateConfig.REQUESTING_FAILURE;
        console.log("请求失败");
    },
    [stateConfig.REQUESTING_RESET](state){
        state.requesting = stateConfig.NOT_REQUEST;
        state.checkSign = stateConfig.NOT_REPEAT;
    },
    [TYPE.REGISTER_REQUEST](state){
        state.requesting = stateConfig.REQUESTING;
        console.log("注册请求已发送");
    },
    [TYPE.REGISTER_SUCESS](state){
        state.requesting = stateConfig.NOT_REQUEST;
        console.log("注册成功");
    },
    [TYPE.REGISTER_FAILURE](state){
        state.requesting = stateConfig.NOT_REQUEST;
        console.log("注册请求发送失败");
    },
}

const actions = { // 状态异步刷新钩子
    CheckUserName({commit}, payload){
        commit(TYPE.CHECK_REQUEST);
        isNameExist(payload.userName).then(
            (res)=>{
                if(res.code === stateConfig.SUCCESS){
                    commit(TYPE.NOT_REPEAT);
                }
                else if(res.code === stateConfig.USERNAME_REPEAT){
                    commit(TYPE.NAME_REPEAT);
                }
                else{
                    commit(TYPE.CHECK_FAILURE);
                }
            },
            (err)=>{
                console.log(err);
                commit(TYPE.CHECK_FAILURE);
            }
        )
    },
    Register({commit}, payload){
        commit(TYPE.REGISTER_REQUEST);
        register(payload.userName, payload.email, payload.password).then(
            (res)=>{
                if(res.code === stateConfig.SUCCESS){
                    commit(TYPE.REGISTER_SUCESS);
                }
                else{
                    commit(TYPE.REGISTER_FAILURE);
                }
            },
            (err)=>{
                console.log(err);
                commit(TYPE.REGISTER_FAILURE);
            }
        )
    },
}

export default{
    state,
    getter,
    mutations,
    actions,
}