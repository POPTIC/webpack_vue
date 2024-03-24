<template>
<!-- TODO: 做一个成果展示柜台 -->
 <div class="back">
    <div class="contianer">
        <div class="item1">
        <h1>DrumKit</h1>
        <DrumKit></DrumKit>
    </div>
        <div class="item2">
            <h1>rotate Cub</h1>
            <MagicCub></MagicCub>
        </div>
        <div class="item3">
            <h1>CSS Clock</h1>
            <CssClock></CssClock>
        </div>
        <div class="item4">
            <h1>Print Canvas</h1>
            <PrintCanvas></PrintCanvas>
        </div>
    </div>
 </div>

</template>

<script setup lang='js'>
import CssClock from '../DecorationComponents/CssClock.vue';
import DrumKit from '../DecorationComponents/DrumKit.vue';
import MagicCub from '../DecorationComponents/MagicCub.vue';
import PrintCanvas from '../DecorationComponents/PrintCanvas.vue'



</script>
<style scoped>
.back{
    display: flex;
    justify-content: center;
    background-color: rgb(210, 210, 210);
}
.contianer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 10px;
}
.contianer > div{
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    margin: 5px;
}
.item1{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
}
.item2{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 4;
}
.item3{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
}
.item4{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
}


</style>