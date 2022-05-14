<template>
  <h1>
    Vue-cal
  </h1>
  <VueCal :time-from="8 * 60" 
          :time-to="19 * 60"  
          :disable-views="['years', 'year', 'month','day']"
          :time-cell-height="90"
          hide-view-selector
          hide-title-bar
          :events="events">
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
    const events = reactive([
        {
           start: '2022-05-14 10:10',
           end: '2022-05-14 11:10',
           content: '불가 <br> 60분',
           class: 'is_next_class'
        },
        {
           start: '2022-05-14 11:10',
           end: '2022-05-14 12:10',
           content: '불가 <br> 60분',
           class: 'notallowd_class'
        }
      ]); 
   
    
    return{
      events
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

.notallowd_class{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 7px;
  color: #fff;
}

.is_next_class{
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-bottom: 1px solid #eee;
  border-radius: 7px;
}


/*================= vue-cal 관련 css custom =================*/

.vuecal{
  background-color: #eee;
  box-shadow: none;
}

.vuecal__cell:before{
  border: none;
}

.vuecal__cell--selected{
  background: none;
}

.vuecal__weekdays-headings{
  border-bottom: none;
}

/* 현재 상태는 다 none 이나 색 없애기 */
.vuecal__now-line{
  display: none;
}

/* No Event 글 없애기 */
.vuecal__no-event{
  display: none;
}

/* 예약된 시간표 색 숨기기 */
.vuecal__event-time {
  display: none;
}
/* 시간표 시간 cell */
.vuecal__time-cell{
  display: flex;
  justify-content: center;
}
.vuecal__time-cell-label{
  display: flex;
  justify-content: center;
  align-items: center;
}

.vuecal__time-column .vuecal__time-cell-line:before {
  border: none;
}

</style>
