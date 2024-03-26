<template>

    <div class="input_wraper">
        <div class="upload_area">
            <div class="pannel_left">
                <button @click="upload_img"><span>封面上传</span><span>不超过3M</span></button>
            </div>
            <div class="pannel_right">
                <div class="cover_wraper">
                    <div v-for="item of file_list"
                        style="text-align: center;background-color: rgb(84, 55, 255); flex: 1;">
                        {{ item }}
                    </div>
                    <div class="cover" @click="upload_video" :style="changeFlex"><span>视频上传</span>
                    </div>
                </div>
                <div class="submit" @click="fileUpload"><span>提交</span></div>
            </div>
        </div>
        <input type="file" accept=".mp4" ref="load_vedio" @change="select_video">
        <input type="file" accept=".webp" ref="load_img">
    </div>

</template>

<script setup lang='js'>
import { ref, computed } from 'vue';
import SparkMD5 from 'spark-md5';
import axios from 'axios';

const get_url = 'http://127.0.0.1:3010/user/loadRequest';
const post_url = 'http://127.0.0.1:3010/user/uploadVideo';
const merge_url = 'http://127.0.0.1:3010/user/videoMerge'
const maxSize = 100 * 1024 * 1024; // 文件限制大小
const multiUploadSize = 1 * 1024 * 1024; // 分片阈值
const eachSize = 1 * 1024 * 1024; // 分片的大小
const suffix = 'mp4';
let totalNumber = 0; // 总分片数
let chunkIndex = 0; // 分片索引
let offset = 0;
let fileHash = 0;

const file_list = ref([]);

let file = null; // 文件指针
let fileSize = 0;
const progress = computed(() => {
    return chunkIndex;
});

// TODO: 使用watch来复位
// watch(){

// }
function reset() { // 传输全局数据复位
    totalNumber = 0;
    chunkIndex = 0;
    offset = 0;
    fileHash = 0;
}

const load_vedio = ref();
const load_img = ref();
const changeFlex = ref('flex:4');

function select_video(e) {
    file = e.target.files[0];
    file_list.value.push(file.name);
    changeFlex.value = `flex:${4 - file_list.value.length}`;

}


function upload_video() {
    // 注意可以使用DOM对象来激活一些操作
    load_vedio.value.click();
};

function upload_img() {
    load_img.value.click();
};

function get_md5(file) { // 这种方式对于超大文件hash值生成的较慢
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        SparkMD5.ArrayBuffer.hash(arrayBuffer);
    }
    reader.readAsArrayBuffer(file)
    console.log(spark.end());
    // 注意获取hash值的接口
    return spark.end();


}
function getSize(size) {
    return size > 1024
        ? size / 1024 > 1024
            ? size / (1024 * 1024) > 1024
                ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB' // 注意这里的对称性，可以用来写长的三元表达式
                : (size / (1024 * 1024)).toFixed(2) + 'MB'
            : (size / 1024).toFixed(2) + 'KB'
        : size.toFixed(2) + 'B';
}

async function fileUpload() {
    fileSize = file.size;
    totalNumber = Math.ceil(fileSize / eachSize);
    const sendList = new Array(totalNumber).fill(0);
    for(let i = 0;i < totalNumber; i++){
        sendList[i] = i;
    }
    fileHash = get_md5(file);
    console.log(fileHash);
    const result = await axios.get(`${get_url}?fileHash=${fileHash}&totalNum=${totalNumber}`).then(
        (res) => {
            console.log(res);
            if (res.data.code === '200') {
                ChunkSlicePost(sendList);
            }
            else if(res.data.code === '206'){
                const waitList = res.data.segment;
                ChunkSlicePost(sendList);
            }
        },
        (err) => {
            console.log(err);
            return new Error("传输失败");
        }
    );
}

// TODO: 尝试以form形式发送数据
// 以form形式发送
// const formData = new FormData();
// 这里使用了一个循环事件 —— 递归法

// 新的版本，使用列表发送报文 —— 可以通过这种方式实现断点重发

function ChunkSlicePost(list) {
    const reader = new FileReader();
    const index = 0;
    const totalBytes = list.length * eachSize;
    const offset = 0;
    // 下面是异步事件结束后的钩子函数
    reader.onload = function (e) {
        const chunk = e.target.result;
        sendChunk(chunk, list[index]);
        index++;
        offset += eachSize;
        if (offset < totalBytes) {
            readNextChunk();
        }
        else {
            mergeChunk();
        }
    };
    function readNextChunk() {
        const start = list[index] * eachSize;
        const end = start + eachSize;
        const blob = file.slice(start, end); // 读取数据
        reader.readAsArrayBuffer(blob); // read操作会触发onload事件
    }
    readNextChunk();
}

// 旧的版本 - 使用索引累增方式发送报文
// function ChunkSlicePost() {
//     const reader = new FileReader();
//     // 下面是异步事件结束后的钩子函数
//     reader.onload = function (e) {
//         const chunk = e.target.result;
//         sendChunk(chunk);
//         chunkIndex++;
//         offset += eachSize;
//         if (offset < fileSize) {
//             readNextChunk();
//         }
//         else {
//             mergeChunk();
//         }
//     };
//     function readNextChunk() {
//         const blob = file.slice(offset, offset + eachSize);
//         reader.readAsArrayBuffer(blob); // read操作会触发onload事件
//     }
//     readNextChunk();
// }

function sendChunk(chunk) {
    axios.post(`${post_url}?fileHash=${fileHash}&index=${idx}`, chunk, {
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    }).then(
        (res) => {
            console.log(res);
        }
    );
}

function mergeChunk() {
    axios.get(`${merge_url}?fileHash=${fileHash}&suffix=${suffix}`).then(
        (res) => {
            console.log(res);
            if (res.data.code === '200') {
                alert("文件上传成功");
                reset();
            }
            else{
                const seg = res.data.segment;
                ChunkSlicePost(seg);
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

</script>
<style scoped>
.input_wraper {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload_area {
    width: 400px;
    height: 300px;
    cursor: pointer;
    background-color: rgb(235, 235, 235);
    border-radius: 8px;
    display: flex;
}

.pannel_left {
    flex: 1;
    display: flex;

}

.pannel_left button {
    width: 100%;
    /* 如果不设置为100%则会伸展不到位置 */
    display: block;
    border: none;
    background-color: rgb(99, 140, 253);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    cursor: pointer;
}

.pannel_left button:hover {
    background-color: rgb(58, 111, 255);
}

.pannel_left button span {
    display: block;
}

.pannel_right {
    flex: 4;
    display: flex;
    flex-direction: column;
}

.cover_wraper {
    display: flex;
    flex-direction: column;
    flex: 4;
}

.cover {
    transition: all 2s ease;
    background-color: rgba(255, 154, 140, 0.7);
    border: 1px dashed black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit {
    text-align: center;
    font-size: medium;
    font-weight: 600;
    border-bottom-right-radius: 8px;
    flex: 1;
    background-color: rgba(190, 162, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit:hover {
    background-color: rgb(190, 162, 255);
}

input {
    display: none;
}
</style>