<template>
  <div class="flex justify-center">
    <div>
      <h1 class="text-center text-3xl m-5">Топ альбомов</h1>
      <MyAlbums class="m-4" :albums="data || []" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AlbumWithRating } from '~/types/AlbumWithRating'
const { data } = await useFetch<AlbumWithRating[]>('http://localhost:8080/albums', {
  transform(data) {
    return data.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
  }
})
</script>

<style></style>