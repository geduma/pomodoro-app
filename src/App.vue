<template>
  <div class="container">
    <HeaderComponent />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  components: {
    HeaderComponent
  }
}
</script>

<style scoped>
</style>
