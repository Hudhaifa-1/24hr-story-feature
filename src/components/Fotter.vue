<template>
  <div class=" bottom-5 bg-[#f3f4f6] overflow-hidden">
    <footer class="relative text-center">
      <div class="text-sm font-semibold py-1 footer-cover">
        <span class="text-[#181818] hover:text-[#181818]">Made with</span>
        <span class="text-red-600">❤</span>
        <span>
          by
          <a target="_blank" href="https://hudhaifa-dev-portfolio.vercel.app/" class=" "
            >Hudhiafa <span class="hidden md:inline-block">Muhammed</span></a
          >
        </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
* {
  font-family: 'Ubuntu', sans-serif;
}

.footer-cover {
  position: relative;
  padding: 12px 35px;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  color: #181818;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}


.footer-cover:hover {
  background: transparent;
  color: #b50e38;
}

</style>