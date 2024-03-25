export const serverUrlRoot = 'http://127.0.0.1:3000';

export const GET_JudgeName = serverUrlRoot + '/register/isNameExist';
export const POST_Resiget = serverUrlRoot + '/register';
export const POST_Login = serverUrlRoot + '/login';

export const GET_UserInfo = serverUrlRoot + '/user/getInfo';
export const GET_UserGalleyURL = serverUrlRoot + '/user/getImgUrl';
export const GET_UserWaitTodo = serverUrlRoot + '/user/waitTodo';
export const GET_UserArticle = serverUrlRoot + '/user/article';
export const GET_UserVideo = serverUrlRoot + '/user/video';


export const GET_MainPageArticleURL = serverUrlRoot + '/mainPage/article';

// chatroom接口
export const GET_FriendList = serverUrlRoot + '/user/getFriendList';
export const GET_Message = serverUrlRoot + '/user/getMessage';
export const wsURL = serverUrlRoot;

// setting接口
export const POST_UpdateUserInfo = serverUrlRoot + '/user/updateInfo';