<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Galleria from 'primevue/galleria'
import convertTimestampTo12HourFormat from '@/helpers/convertTimeStampTo12HourFormat'
import { useStoryStore } from '@/stores/storyStore'
import { timeAgoOnly } from '@/helpers/timeAgo'
import StoryCreate from '@/components/StoryCreate.vue'
import StoryContent from '@/components/StoryContent.vue'
import Fotter from '@/components/Fotter.vue'

const storyStore = useStoryStore()
const storedStories = computed(() => storyStore.stories)
const isStoryShow = ref(false)
const activeIndex = ref(0)
const activeStoryId = ref(null)
const storyInterval = ref(null)

const showStory = (story) => {
  isStoryShow.value = true
  updateActiveIndexAndId(
    storedStories.value.findIndex((s) => s.id === story.id),
    story.id,
  )
  autoStoryNavigation(activeIndex.value)
}

const closeStory = () => {
  storyStore.makeStoryView(activeIndex.value)
  isStoryShow.value = false
  clearInterval(storyInterval.value)
}

const updateActiveIndexAndId = (index, id) => {
  activeIndex.value = index
  activeStoryId.value = id
}

const autoStoryNavigation = (index) => {
  /*
    Why "clearInterval in the begain of method?"

    if someone click on some story , here the stories will
    navigation automaticly , using the below logic ,
    but while the auto navigation is running , and
    the user click "next" or "prev" button ,
    what will happen?
    let assume he click on the next button ,
    currently method will be called , and we should
    clear the previous interval , beacuse it will cause
    a lot of problems , so for that we will clear the interval
    in the begining of the method :)
    */

  clearInterval(storyInterval.value)
  let accumulatedStoryIndex = index
  storyInterval.value = setInterval(() => {
    storyStore.makeStoryView(accumulatedStoryIndex)
    if (!(accumulatedStoryIndex > storedStories.value.length - 2)) {
      accumulatedStoryIndex += 1
      updateActiveIndexAndId(accumulatedStoryIndex, storedStories.value[accumulatedStoryIndex].id)
    } else {
      closeStory()
      clearInterval(storyInterval.value)
    }
  }, 3000)
}

// Clear stories that exceed 24 hour
const cleanUpStories = () => {
  if (storyStore.stories.length > 0) {
    let newStoriesArray = storedStories.value.filter((story) => {
      let storyTime = story.timestamp
      let hoursAgo = timeAgoOnly(storyTime)
      return hoursAgo ? hoursAgo <= 24 : story
    })
    storyStore.saveStoryInLocalstorage(newStoriesArray)
  } else {
    if (storyStore.isStoriesReversed == true) {
      storyStore.saveIsStoryReversed(false)
    }
  }
}

const nextStory = () => {
  if (activeIndex.value < storedStories.value.length - 1) {
    storyStore.makeStoryView(activeIndex.value)
    let newActiveIndex = ++activeIndex.value
    updateActiveIndexAndId(newActiveIndex, storedStories.value[newActiveIndex].id)
    autoStoryNavigation(newActiveIndex)
  }
}

const prevStory = () => {
  if (activeIndex.value > 0) {
    storyStore.makeStoryView(activeIndex.value)
    let newActiveIndex = --activeIndex.value
    updateActiveIndexAndId(newActiveIndex, storedStories.value[newActiveIndex].id)
    autoStoryNavigation(newActiveIndex)
  }
}

onMounted(() => {
  const interval = setInterval(() => {
    cleanUpStories()
  }, 60000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div class="relative z-[40] w-full">
    <div v-if="isStoryShow" class="absolute top-8 right-4 text-xl z-[1000] cursor-pointer">
      <i @click="closeStory" class="pi pi-times text-white cursor-pointer hover:text-white/80"></i>
    </div>
    <Galleria
      v-show="isStoryShow"
      :value="storedStories"
      :numVisible="5"
      :circular="false"
      :showItemNavigators="false"
      :showThumbnails="true"
      :activeIndex="activeIndex"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.storyImage" />
        <div class="flex absolute top-2 gap-1 w-full px-2">
          <div
            v-for="item in storedStories"
            :key="item"
            class="w-full h-[0.1rem] rounded-lg text-white relative bg-gray-500"
          >
            <p
              class="indent-0"
              :class="[item.id === activeStoryId ? 'timeline-active' : 'timeline-inactive']"
            ></p>
          </div>
        </div>
        <p class="absolute bottom-5 left-5 text-gray-400">
          {{ convertTimestampTo12HourFormat(slotProps.item.timestamp) }}
        </p>
        <button
          class="fixed mt-6 left-1 top-[50%] text-white cursor-pointer text-xl"
          @click="prevStory"
        >
          <i class="pi pi-chevron-left"></i>
        </button>
        <button
          class="fixed mt-6 right-1 top-[50%] text-white cursor-pointer text-xl"
          @click="nextStory"
        >
          <i class="pi pi-chevron-right"></i>
        </button>
      </template>
    </Galleria>
    <div class="mx-auto w-full p-3 bg-[#f3f4f6] overflow-hidden z-10 min-h-screen md:w-[60%]">
      <h3 class="text-2xl text-black font-bold mb-8">Stories</h3>
      <div class="flex gap-3 overflow-x-auto p-1">
        <StoryCreate />
        <div class="flex gap-3">
          <StoryContent
            @show-story="showStory"
            v-for="story in storedStories"
            :key="story.id"
            :story="story"
          />
        </div>
      </div>
      <Fotter class="top-[36rem] relative" />
      <div
        v-if="storedStories.length <= 0"
        class="mt-16 flex justify-center text-gray-400 text-center"
      >
        No stories yet. Click the + button to add your first story!
      </div>
    </div>
  </div>
</template>

<style>
div#pv_id_1 {
  max-width: 100% !important;
  z-index: 100;
  background: rgba(0, 0, 0, 0.905) !important;
  width: 100%;
  height: 100%;
  position: absolute;
}

div#pv_id_1 img {
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: cover;
}
@media only screen and (min-width: 768px) {
  div#pv_id_1 img {
    max-width: 35rem !important;
    max-height: 35rem !important;
    object-fit: cover;
  }
}

.p-galleria-items {
  position: relative !important;
  z-index: 10 !important;
  min-height: 100vh;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

svg.p-icon.p-galleria-next-icon,
svg.p-icon.p-galleria-prev-icon {
  width: 25px;
  height: 25px;
  color: white;
}

@keyframes timeline {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.timeline-active {
  height: 0.1rem;
  background: white;
  animation: timeline 3s linear forwards;
}

.timeline-inactive {
  height: 0.1rem;
  background: gray;
}
</style>
