<style lang="scss" scoped>
%clear-both::after {
  content: "";
  display: block;
  clear: both;
}
%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.we-container {
  @extend %clear-both;
  position: relative;
  width: 100%;
}

.to-Top {

}
</style>

<template>
  <div class="we-container" id="advisor">
    <carouseMap id="moment" v-if="$store.state.mode == 1"></carouseMap>
    <counselor id="advisor" v-if="$store.state.mode == 2"></counselor>
    <group id="direction" v-if="$store.state.mode == 3"></group>
    <honor id="honors" v-if="$store.state.mode == 4"></honor>
    <!-- <toTop class="to-Top"></toTop> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import toTop from '../nav/backToTopButton.vue'
import Component from 'vue-class-component';
import carouseMap from './carouselMap/carouselMap.vue'
import counselor from './counselor/counselor.vue'
import group from './group/group.vue'
import honor from './honor/honor.vue'

@Component({
  components: {
    carouseMap,
    counselor,
    group,
    honor,
    toTop
  }
})
export default class We extends Vue{

  mounted() {

  }
}
</script>
