<template>

 <div class="board">

    <div class="input_label">{{ props.label }}</div>

    <input  
        
        required="ture"
        :type="props.type"
        v-model="model"
        :placeholder="props.fill"
        @blur="wrap"
        v-if="props.type!=='email'"
    >
    <!-- 模板元素上可以传入props，注意在使用v-命令时""里面的内容会被识别为变量运算
        因此如果要使用一个字符串要额外加'' -->

    <div
        v-else
        class="email_board"
    >
        <input
            required="true"
            type="text"
            v-model="model"
            :placeholder="props.fill"
            @blur="wrap"
        >
        <div class="symbol">
            @
        </div>
        <select>
            <option value="tencent">qq.com</option>
            <option value="netease">163.com</option>
        </select>
    </div>
 </div>


</template>

<script setup lang='js'>
import {ref, reactive, toDisplayString} from 'vue'

// TODO: 添加对于字符规范的检验

let props = defineProps(['type', 'fill', 'label']);

const model = defineModel();

</script>
<style scoped>

.board{
    display: flex;
    border: 3px solid rgba(108, 50, 216, 0.2);
    border-radius: 6px;
}


/* 普通输入格式 */

.input_label{
    flex: 1;
    font-size: x-large;
    font-weight:bold;
    color: rgb(70, 39, 133);
    margin: 0px;
    box-sizing: content-box;
    text-align: center;
    border-right: 3px solid rgba(213, 71, 58, 0.211);
    padding-left: 10px;
    padding-right: 10px;
}

input{
    display: block;
    /* 对于行内元素 —— 可以看作是文字的等价类型，如果很不好调整布局格式，可以考虑通过display属性将其转换为block */
    font-size: medium;
    font-weight: 200;
    transition: box-shadow  0.1s;
    /* border: 1px silver solid; */
    border: 0px;
    border-radius: 10px;
    /* 如果两个元素相距太近可以考虑使用padding来将其推开 */
    
}
input:focus{
    outline : none;
}
input[type='text']:hover{
    color: rgb(86, 66, 216);
    caret-color: slateblue;
    box-shadow: 0 0 3px rgb(124, 124, 206);
    background-color: rgb(227, 244, 249);
}
input[type='text']:focus{
    border: 1px solid blue;
    
}

input[type='password']{
    font-size: medium;
}
input[type='password']:hover{
    color: rgb(58, 47, 131);
    caret-color: red;
    box-shadow: 0 0 3px rgb(173, 37, 58);
    background-color: rgb(249, 227, 244);
}


/* 密码格式 */



.email_board{
    display : flex;
    padding : 0;
    margin : 0;
}
.symbol{
    font-size: x-large;
    font-weight:bold;
    color: rgba(18, 40, 184, 0.782);
    margin: 0px;
    box-sizing: content-box;
    text-align: center;
}


</style>