<script setup>
import convertImageToBase64 from '@/helpers/convertImageToBase64'
import { useStoryStore } from '@/stores/storyStore'
import { v4 as uuidv4 } from 'uuid'

const storyStore = useStoryStore();

const handleStoryCreation = async (event) => {
  const uniqueId = uuidv4()
  const currentTimeStamp = new Date().getTime()

  const storyImage = await convertImageToBase64(event.target.files[0])

  const storyObject = {
    id: uniqueId,
    storyImage: storyImage,
    timestamp: currentTimeStamp,
    viewed: false,
  }

  storyStore.saveNewStory(storyObject);

  // stories.push(storyObject)
  // const storedStories = JSON.parse(localStorage.getItem('stories')) || []
  // storedStories.push(...stories)
  // storyStore.saveStoryInLocalstorage(storedStories)
  // storyStore.stories.unshift(storyObject)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <input
      @change="handleStoryCreation"
      class="hidden"
      accept="image/jpefg"
      ref="filePicker"
      type="file"
      name=""
      id=""
    />
    <div
      @click="$refs.filePicker.click"
      class="size-[3.9rem] rounded-full outline-dashed text-sky-500 flex justify-center items-center hover:bg-sky-50 transition-colors duration-300 cursor-pointer"
    >
      <i class="pi pi-plus"></i>
    </div>
    <p class="text-[0.8rem] mt-1 text-gray-400">Add story</p>
  </div>
</template>
