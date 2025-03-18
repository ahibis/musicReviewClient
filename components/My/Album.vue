<template>
  <div>
    <div class="p-4 rounded-md bg-cyan-900" @click="switchTracks">
      {{ data.userName }} - {{ data.title }} ({{ data.averageRating ? data.averageRating.toFixed(1) : '?' }})
    </div>
    <div v-if="isOpen">
      <template v-for="track in tracks" :key="track.id">
        <MyTrack :data="track" />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { AlbumWithRating } from '~/types/AlbumWithRating';
import type { Track } from '~/types/Track';

const { data } = defineProps<{ data: AlbumWithRating }>()

const isOpen = ref(false);
const tracks = ref<Track[]>([])

async function switchTracks() {
  console.log(1)
  if (tracks.value.length == 0) {
    tracks.value = (await $fetch<{ tracks: Track[] }>(`http://localhost:8080/albums/withTracks/${data.albumId}`)).tracks;
  }
  isOpen.value = !isOpen.value;

}
</script>