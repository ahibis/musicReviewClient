<template>
  <div class="flex justify-center">
    <div v-if="myAlbums.length > 0">
      <h1 class="text-center text-3xl m-5">Топ альбомов</h1>
      <MyAlbums class="m-4" :albums="myAlbums" />
    </div>
    <div v-else>
      <h1>Вы не авторизовались или нет оцененных альбомов</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AlbumWithRating } from '~/types/AlbumWithRating'
const myAlbums = ref<AlbumWithRating[]>([])
onMounted(async () => {
  const token = getToken();
  const albums = await $fetch<AlbumWithRating[]>("http://localhost:8080/albums/my", {
    method: "POST",
    body: {
      token
    }
  })
  if (albums == null) {
    return;
  }
  myAlbums.value = albums
})
</script>

<style></style>