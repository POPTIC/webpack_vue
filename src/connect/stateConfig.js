export default {
    // 后端返回状态
    USERNAME_REPEAT : '001',
    USERNAME_NOTEXIST : '011',
    USERNAME_PASSWORD_NOT_MATCH : '012',
    NO_LOGIN : '401',
    UNKNOW_ERROR : '090',
    SUCCESS : '200',

    // vuex状态
    NOT_REQUEST : 0,
    REQUESTING : 1,
    REQUESTING_FAILURE : 2,
    REQUESTING_SUCESS : 3,
    REQUESTING_RESET : 'REQUESTING_RESET',

    REPEAT : 0,
    NOT_REPEAT : 1,
    
    NO_REGISTER : 0,
    REGISTER_FAIL : 1,
    REGISTER_SUCCESS : 2,

    TO_USER : 1,
    FROM_USER : 0,

} // 如果使用单变量引用则一定要加default, 使用了default则在后续引用该变量时不用加{}