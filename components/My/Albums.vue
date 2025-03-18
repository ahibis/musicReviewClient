<template>
  <div>
    <MyAlbum v-for="album in albums" :key="album.albumId" :data="album" class="m-1 w-96" />
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from 'nuxt/app';
import type { AlbumWithRating } from '~/types/AlbumWithRating'

const { albums } = defineProps<{ albums: AlbumWithRating[] }>()


</script>

<style></style>