<script lang="ts" setup>

</script>
<template>
  <div class="flex justify-around bg-secondary-950 p-1">
    <div>
      <NuxtLink to="/">
        <UButton class="bg-blue-800 text-center rounded-sm">Топ альбомов</UButton>
      </NuxtLink>
      <NuxtLink to="/review" class="pl-2">
        <UButton class="bg-blue-800 text-center rounded-sm">Оценить альбом</UButton>
      </NuxtLink>
      <NuxtLink to="/myalbums" class="pl-2">
        <UButton class="bg-blue-800 text-center rounded-sm">Мои оценки</UButton>
      </NuxtLink>
      <NuxtLink to="/crypto" class="pl-2">
        <UButton class="bg-blue-800 text-center rounded-sm">Шифрование</UButton>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink to="/acc" class="pl-2">
        <Icon name="mdi:account" style="height: 100%; width: 3em;" />
      </NuxtLink>
    </div>

  </div>
</template>



<style></style>