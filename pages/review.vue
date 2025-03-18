<template>
  <div class="flex justify-center pt-10">
    <div>

      <!-- <div v-if="session.loggedIn">
        <NuxtLink @click="logout" to="/">Logout</NuxtLink>
        <a>Hey you are logged in!</a>
        <p>Session: {{ session }}</p>
      </div>
      <div v-else>
        <TelegramLoginWidget telegram-login="ReviewMusicBot" @callback="testCallback" />
      </div> -->
      <UInput type="string" v-model="url" class="w-full" />
      <div class="flex justify-center">
        <div>
          <UButton color="secondary" @click="getAlbum()">получить альбом</UButton>
          <div v-if="data">
            <h1>{{ data.title }}</h1>
            <div>
              <p v-for="track of data?.volumes[0]" :key="track.title">{{ track.title }}</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Track } from '~/types/Track';

const url = ref("");
const { add } = useToast();
const tracks = ref<Track[]>([])
const data = ref<AlbumResponse>()
interface AlbumResponse {
  artists: {
    name: string
  }[],
  title: string,
  volumes: ({ title: string }[])[]
}

async function getAlbum() {
  if (!url.value.startsWith("https://music.yandex.ru/album")) {
    return;
  }
  const albums = await $fetch<AlbumResponse>("http://localhost:8080/albums/yandex/" + url.value.split("/").at(-1))
  data.value = albums;
  console.log(albums);
}


</script>