<script setup>
import {timeAgo} from '@/helpers/timeAgo'

const props = defineProps({
  story: Object,
})

const emit = defineEmits(['showStory'])
</script>

<template>
  <div class="flex flex-col items-center w-full min-w-fit">
    <div
      @click="$emit('showStory', story)"
      class="relative overflow-hidden size-[4rem] rounded-full border-2 flex justify-center items-center hover:scale-[1.05] transition-all duration-300 cursor-pointer"
      :class="[story.viewed? 'border-gray-500' : 'border-sky-500']"
    >
      <img class="w-full h-full absolute object-cover" :src="story.storyImage" alt="" />
    </div>
    <p class="text-[0.6rem] mt-1 text-gray-400">{{ timeAgo(story.timestamp) }}</p>
  </div>
</template>
