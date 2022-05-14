<template>
  <h1>
    Vue-cal
  </h1>
  <VueCal :time-from="8 * 60" 
          :time-to="19 * 60"  
          :disable-views="['years', 'year', 'month','day']" 
          hide-view-selector
          hide-title-bar
          :special-hours="specialHours">
  </VueCal>
</template>

<script>
import { reactive } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

//vue calendar

export default {
  components:{
    VueCal,
  },
  name: 'App',
  setup(){
    const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };
    const specialHours = reactive({
      1: dailyHours,
      2: dailyHours,
      3: [
        { from: 9*60, to: 12 * 60, class: 'business-hours' },
        { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
      ],
      4: dailyHours,
      5: dailyHours
    });
    
    return{
      specialHours
    }
  }
}
</script>

<style>
.business-hours {
  background-color: rgba(255, 255, 0, 0.2);
  border: solid rgba(255, 210, 0, 0.6);
  border-width: 2px 0;
}

/* 현재 상태는 다 none 이나 색 없애기 */
.vuecal__now-line{
  display: none;
}

/* No Event 글 없애기 */
.vuecal__no-event{
  display: none;
}
</style>
