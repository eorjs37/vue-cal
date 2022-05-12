<template>
  <h1>
    Vue-cal
  </h1>
  <VueCal :time-from="8 * 60" 
          :time-to="19 * 60"  
          :disable-views="['years', 'year', 'month','day']" 
          hide-view-selector
          hide-title-bar>
  </VueCal>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
export default {
  components:{
    VueCal
  },
  name: 'App',
}
</script>

<style>
</style>
