<template>
  <div>
    <MyAlbum v-for="album in data" :key="album.albumId" :data="album" class="m-1 w-96" />
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from 'nuxt/app';
import type { AlbumWithRating } from '~/types/AlbumWithRating'


const { data } = await useFetch<AlbumWithRating[]>('http://localhost:8080/albums', {})







</script>

<style></style>