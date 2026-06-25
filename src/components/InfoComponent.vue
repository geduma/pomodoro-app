<template>
  <!-- Modal -->
  <div class="modal fade" id="info-modal" tabindex="-1" aria-labelledby="info-modal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="g-btn btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="text-center mt-4 mb-4">
            <a href="https://geduma.com" target="_blank" rel="noopener noreferrer">
              By @geduma &#9749;
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'InfoComponent',
  setup() {
   return{

   } 
  }
}
</script>
<style scoped>
a {
  color: var(--default-color) !important;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.btn-close {
  float: right;
}
</style>
