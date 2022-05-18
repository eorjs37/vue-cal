<template>
  <h1>
    Vue-cal
  </h1>
  <VueCal :time-from="9 * 60" 
          :time-to="19 * 60"  
          :disable-views="['years', 'year', 'month','day']"
          :time-cell-height="60"
          hide-view-selector
          hide-title-bar
          locale="ko"
          :time-step="30"
          :events="events">

          <template v-slot:weekday-heading="{ heading }" class="week_head">
             <div> 
               <span class="circle"></span>
             </div>
             <span class="day">
               {{ heading.label }}
             </span>
             <span class="date">
               20
             </span>
          </template>
  </VueCal>
</template>

<script>
import { onMounted, reactive } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/i18n/ko.js';
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
           start: '2022-05-16 10:10',
           end: '2022-05-16 11:10',
           content: '불가 <br> 60분',
           class: 'is_next_class',
        },
        {
           start: '2022-05-16 11:10',
           end: '2022-05-16 12:10',
           content: '불가 <br> 60분',
           class: 'notallowd_class'
        },
        {
           start: '2022-05-17 08:10',
           end: '2022-05-17 12:10',
           content: '불가 <br> 240분',
           class: 'is_next_class'
        },
        {
           start: '2022-05-17 12:10',
           end: '2022-05-17 13:05',
           content: '불가 <br> 55분',
           class: 'notallowd_class'
        },
      ]); 


      onMounted(()=>{
        console.log(events);
      })
   
    
    return{
      events
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

*{
  box-sizing: border-box;
}
body{
  font-family: 'Noto Sans KR', sans-serif;
}
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
  color: #fff;
}

.is_next_class{
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  /* border-radius: 7px; */
  border-bottom: 5px solid rgba(0, 128, 0, 0.459);
}


/*================= vue-cal css custom =================*/

.vuecal{
  background-color: #f7f7f7;
  box-shadow: none;
  padding: 13px 30px;
}

/* weekday-head */
.vuecal__heading{
  height: 57px;
}

.vuecal__heading .weekday-label{
  flex-direction: column; 
}

.vuecal__cell:before{
  border: none;
}

.vuecal__cell--selected{
  background: none;
}

.vuecal__weekdays-headings{
  border-bottom: none;
  padding-bottom: 17px;
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

/*================= vue-cal 관련 css custom =================*/
.status{
  height: 10px;
}
.circle{
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #e76d24;
}

.day{
  display: inline-block;
  font-size: 13px;
  line-height: 19px;
  font-weight: 500;
  padding: 0;
}

.date{
  display: inline-block;
  font-size: 12px;
  line-height: 17px;
  color: #a1a1a1;
}
</style>
