<template>
  <footer>
    <a href="#/settings">
      <img src="@public/icons/settings.svg" alt="github" class="g-btn" />
    </a>
    <a href="https://github.com/geduma/pomodoro-app" target="_blank" rel="noopener noreferrer">
      <img src="@public/icons/github.svg" alt="github" class="g-btn" />
    </a>
    <img src="@public/icons/info.svg" alt="github" class="g-btn" data-bs-toggle="modal" data-bs-target="#info-modal" />
  </footer>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'

export default {
  name: 'FooterComponent',
  setup() {
    const route = useRoute()
    console.log(route.name)

    return {
    }
  }
}
</script>
<style scoped>
footer {
  justify-content: center;
  display: flex;
  gap: 1rem;
}

img {
  height: 30px;
}
</style>
