import * as url from "./URLconfig.js"
import axios from "./axiosInstace.js"
import toQuery from "../utils/toQuery.js";

export const isNameExist = function (userName) {
    const para_url = toQuery({ userName }, url.GET_JudgeName);
    return axios.get(para_url).then((response) => {
        console.log(response);
        return response.data;
    })
}

export const login = function (name, password) {
    console.log(name, password);
    const data = {
        userName: name,
        password: password
    }
    return axios.post(url.POST_Login, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        localStorage.clear();
        localStorage.setItem("token", response.data.data.token);
        return response.data;
    }) // 注意没有将这个函数使用async await定义为异步模块，因此无法立即获取这个函数调用的结果
}

export const register = function (userName, email, password) {
    const data = {
        userName,
        email,
        password,
    }
    return axios.post(url.POST_Resiget, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data;
    });
}

export const getUserInfo = function (id) {
    // 封装body
    const data = {
        id
    }
    return axios.post(url.GET_UserInfo, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data;
    }, (err) => {
        console.log(err);
        return;
    })
}


export const getUserImgURL = function (userId) {
    const data = { // 封装JSON-data
        id: userId
    }
    return axios.post(url.GET_UserGalleyURL, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data;
    }, (err) => {
        console.log(err);
        return err;
    })
};

export const getFriendList = function (userName) {
    const data = {
        userName
    }
    console.log(data);
    return axios.post(url.GET_FriendList, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (res) => {
            console.log(res);
            return res.data; // 返回data因为axios对底层的连接响应进行了封装
        },
        (err) => {
            return err;
        }
    )
};

export const getMessage = function (userName) {
    const data = {
        userName,
    };
    return axios.post(url.GET_Message, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (res) => {
            console.log(res);
            return res.data;
        },
        (err) => {
            console.log(err);
            return err;
        }
    )
}

// send message不使用http协议来发送信息，使用websocket来发送信息
// export const SendMessage(from, to, message){
//     const data = {
//         from,
//         to,
//         message,
//     };
//     return axios.post();
// }
