<style lang="scss" scoped>
.members-container {
  position: relative;
  width: 100%;
}
</style>

<template>
  <div class="members-container">
    <mains></mains>
    <toTop></toTop>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Component from 'vue-class-component';
import mains from './main/main.vue'
import toTop from '../nav/backToTopButton.vue'

@Component({
  components: {
    mains,
    toTop
  }
})
export default class Members extends Vue {
}
</script>
