<template>
  <div>
    <div class="p-1 rounded-md bg-cyan-700">
      {{ data.title }} {{ (data.markSum && data.markCount) ? `(${data.markSum / data.markCount})` : "" }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Track } from '~/types/Track';
const { data } = defineProps<{ data: Track }>()

</script>