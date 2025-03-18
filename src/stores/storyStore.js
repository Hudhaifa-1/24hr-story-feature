import { defineStore } from 'pinia'

export const useStoryStore = defineStore('story', {
  state: () => ({
    stories: localStorage.getItem('stories') ? JSON.parse(localStorage.getItem('stories')) : [],
    isStoriesReversed: JSON.parse(localStorage.getItem('isReversed')),
  }),

  actions: {
    saveStoryInLocalstorage(stories) {
      localStorage.setItem('stories', JSON.stringify(stories))
    },

    saveIsStoryReversed(status) {
      localStorage.setItem('isReversed', status)
      this.isStoriesReversed = status
    },

    saveNewStory(story) {
      if (this.stories.length <= 0) {
        this.saveIsStoryReversed(false)
        this.stories.push(story)
        this.saveStoryInLocalstorage(this.stories)
      } else {
        if (this.isStoriesReversed == false) {
          this.saveIsStoryReversed(true)
          this.stories.push(story)
          this.stories.reverse()
          this.saveStoryInLocalstorage(this.stories)
        } else {
          this.stories.unshift(story)
          this.saveStoryInLocalstorage(this.stories)
        }
      }
    },

    makeStoryView(storyIndex) {
      this.stories[storyIndex].viewed = true
      this.saveStoryInLocalstorage(this.stories)
    },
  },
})
