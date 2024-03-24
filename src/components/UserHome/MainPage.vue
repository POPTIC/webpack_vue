<template>

 <div class="main_page">
    <UserGalley></UserGalley>
    <EventCheck></EventCheck>
 </div>

</template>

<script setup lang='js'>
import UserGalley from './UserGalley.vue'
import EventCheck from './EventCheck.vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue';

const store = useStore();

onMounted(() => {
    store.dispatch('getImgUrl');
})
</script>
<style scoped>
.main_page{
    margin: 10px;
}
</style>