import * as TYPE from '../actionType/GalleyType.js'
import { getUserImgURL } from '../../connect/api.js'
import stateConfig from '../../connect/StateConfig.js'
import {serverUrlRoot} from '../../connect/URLconfig.js'

const state = {
    galleyUrl : [null, null, null, null],
    // 在state中不能使用构造函数
}

const getter = {
    galleyUrl : (state) => state.galleyUrl,
}

const mutations = {
    [TYPE.GALLEY_ITEM_REQUEST](){
        console.log("正在获取url");
    },
    [TYPE.GALLEY_ITEM_SUCESS](state){ // 这里多了一个参数
        console.log("url获取成功");
    },
    [TYPE.GALLEY_ITEM_FAILURE](){
        console.log("url获取失败");
    },
}

const actions = { // 状态异步刷新钩子
    getImgUrl({commit, state, rootState}){
        commit(TYPE.GALLEY_ITEM_REQUEST);
        getUserImgURL(rootState.id).then(
            (res) => {
                // 在这里出现了问题，在原来的设计中(return data.data)返回的是{token , id}所以会进入else分支，导致报出错误
                // 这里res会发送数据过来，但是发过来的为空的集合
                if(res.code === stateConfig.SUCCESS && res.data.length){
                    commit(TYPE.GALLEY_ITEM_SUCESS);
                    for(let i = 0; i < 4; i++){
                        state.galleyUrl[i] = serverUrlRoot + res.data[i].img_url;
                        
                    }
                    console.log(state.galleyUrl);    
                }
                else{
                    commit(TYPE.GALLEY_ITEM_FAILURE);
                }
            },
            (err) => {
                console.log(err);
                commit(TYPE.GALLEY_ITEM_FAILURE);
            }
        )
    }
}

export default{
    state,
    getter,
    mutations,
    actions,
}