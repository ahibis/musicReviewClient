<template>
  <UApp>
    <TheNavbar />
    <NuxtPage />
  </UApp>
</template>
<script setup lang="ts">
const route = useRoute();
onMounted(() => {
  const token = route.query.token;
  if (token) {
    setToken(token as string);
  }
})
</script>