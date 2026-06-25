<template>
  <footer>
    <div class="icons">
      <a href="#/settings">
        <img src="@public/icons/settings.svg" alt="settings" class="g-btn" />
      </a>
      <a href="https://github.com/geduma/pomodoro-app" target="_blank" rel="noopener noreferrer">
        <img src="@public/icons/github.svg" alt="github" class="g-btn" />
      </a>
    </div>
    <a class="credit" href="https://geduma.com" target="_blank" rel="noopener noreferrer">
      By @geduma &#9749;
    </a>
  </footer>
</template>
<script lang="ts">
export default {
  name: 'FooterComponent',
  setup() {
    return {}
  }
}
</script>
<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
}

.icons {
  display: flex;
  gap: 1rem;
}

img {
  height: 30px;
}

.credit {
  color: var(--default-color);
  text-decoration: none;
  opacity: .7;
  font-size: 12px;
}

.credit:hover {
  opacity: .5;
  text-decoration: underline;
}
</style>
