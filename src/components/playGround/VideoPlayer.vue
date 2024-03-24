<template>

    <div class="player">
        <div class="play_board">
            <video class="player_video viewer" :src="video_src" ref="video" @click="swithState"
                @timeupdate="playProgressUpdate">
                <!-- 注意这里:src 和 src 在语义上的区别 -->
            </video @timeupdate="upload">
            <!-- 下面的块为进度条 -->
            <div class="progress_slot" ref="progress_slot" @click="chooseProgress">
                <div class="progress_slide" ref="progress_slide"></div>
            </div>

        </div>


        <div class="player_controls">
            <button class="player_button" title="Play-Pause" ref="play_button" @click="swithState">►</button>
            <input type="range" name="volume" class="player_slider" min="0" max="1" step="0.05" value="1"
                ref="sound_button" @click="rangeUpDate">
            <input type="range" name="playbackRate" class="player_slider" min="0.5" max="2" step="0.1" value="1"
                ref="rate_button" @click="rangeUpDate">
            <button data-skip="-10" class="player_button" ref="forward_button" @click="skip">« 10s</button>
            <button data-skip="15" class="player_button" ref="backword_button" @click="skip">15s »</button>
        </div>

    </div>

</template>

<script setup lang='js'>
import axios from 'axios';
import { ref, onMounted } from 'vue'


const video = ref();
const progress_slot = ref();
const progress_slide = ref();
const play_button = ref();
const sound_button = ref();
let index = 0;

// 与连接相关的配置
const get_url = 'http://127.0.0.1:3010/user/getVideo';
const post_url = 'http://127.0.0.1:3010/user/loadRequest';

let totalSize = 5524488;
let chunkSize = 1048576;
let chunkNum = Math.ceil(totalSize / chunkSize);
let chunk = null;
let videoCurrent = 0;

const mediaSource = new MediaSource();
const video_src = ref(URL.createObjectURL(mediaSource));

function shiftPlayerState(state) {
    console.log(state);
    video.value[state]();
}

function swithState(e) {
    let target = video.value.paused ? 'play' : 'pause';
    shiftPlayerState(target);
    const icon = video.value.paused ? '►' : '❚ ❚';
    play_button.value.textContent = icon;
}

function chooseProgress(e) {
    console.log(progress_slot);
    console.log(e.offsetX, progress_slot.value.offsetWidth);
    let videoCurrent = (e.offsetX / progress_slot.value.offsetWidth) * video.value.duration;
    video.value.currentTime = videoCurrent;
    playProgressUpdate();

}

function rangeUpDate(e) {
    video.value[e.target.name] = e.target.value;
}

// 这里用于更新进度
function playProgressUpdate() {
    let percent = (video.value.currentTime / video.value.duration) * 100;
    videoCurrent = video.value.currentTime;
    progress_slide.value.style.width = `${percent}%`;
    // if (percent > 80) {
    //     getSegment();
    // }
}
function skip(e) {
    // 在使用v-on往dom结点上绑定函数时不要使用this，因为此时的this没有绑定到事件本身上（可能可底层实现有关）
    let skip = parseFloat(e.target.dataset.skip);
    video.value.currentTime += skip;
    videoCurrent = video.value.currentTime;
}

mediaSource.addEventListener('sourceopen', async function () {
    const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    let isAppending = false; // 信息量

    const getSegment = async (start, end) => {
        const headers = {
            Range: `bytes=${start}-${end}`,
        };
        return axios.get(get_url, { headers, responseType: 'arraybuffer' }).then(
            (res) => {
                chunk = res.data;
                console.warn(index);
                index++;
            },
            (err) => {
                console.log(err, "分片传输失败");
                return err;
            }
        )
    }

    const playNextChunk = async () => {
        console.log('index', index);
        if (index < chunkNum) {
            const start = index * chunkSize
            const end = Math.min(start + chunkSize - 1, totalSize - 1);
            console.log(start, end);
            await getSegment(start, end);
            isAppending = true;
            console.log("get the data");
            sourceBuffer.appendBuffer(chunk); // 因为这个是个异步事件因此需要加锁
            console.log(123);
        }
        else {
            mediaSource.endOfStream();
            video.play();
        }
    }

    sourceBuffer.addEventListener('updateend', function () {
        if (isAppending) {
            isAppending = false;
            // index++; 在这里进行index更新会出现问题
            console.log('加载成功');
            // playNextChunk();
        }

        video.value.addEventListener('timeupdate', function () {
            const currentTime = video.value.currentTime;
            const buffered = video.value.buffered;
            if (!isAppending && index < chunkNum && currentTime >= buffered.end(buffered.length - 1) - 5) {
                isAppending = true;
                playNextChunk();
            }
        });
    });

    playNextChunk();
});

</script>
<style scoped>
.player_video {
    width: 100%;
    height: 100%;
    transition: all 1s;
    margin: 0px;
    padding: 0px;
}

.play_board {
    position: relative;
    background-color: rgb(148, 148, 255);
}

.progress {
    width: 100%;
    height: 30px;
    position: relative;
}

.progress_slide {
    width: 0%;
    height: 10px;
    transition: 1s;
    background-color: rgb(32, 32, 83);
    position: absolute;
    padding: 0px;
    margin: 0px;
    /* 注意在absolute布局中，top和bottom相对的位置 */
}

.play_board:hover .progress_slot {
    height: 20px;
    opacity: 60%;
}

.play_board:hover .progress_slot .progress_slide {
    background-color: blue;
    height: 20px;
    opacity: 60%;
}

.progress_slot {
    transition: all 1s;
    background-color: gray;
    position: absolute;
    bottom: 0px;
    padding: 0px;
    width: 100%;
    height: 10px;
}

.player_controls {
    display: flex;
    justify-content: center;
}

button {
    margin: 10px;
    display: block;
}

input {
    display: block;
}
</style>