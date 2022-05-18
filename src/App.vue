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
          hide-weekends
          locale="ko"
          :time-step="30"
          :events="events">

          <template v-slot:weekday-heading="{ heading }" class="week_head">
             <div> 
               <span class="circle" :class="currentDate === filterDate(heading.date)  ?  'have_class' : 'not_class'"></span>
             </div>
             <span class="day" :class="currentDate === filterDate(heading.date)  ?  'active' : ''">
               {{ heading.label }}
             </span>
             <span class="date" :class="currentDate === filterDate(heading.date)  ?  'active' : ''">
               {{  filterDate(heading.date)  }}
             </span>
          </template>
  </VueCal>
</template>

<script>
import {  onMounted, reactive, ref } from 'vue';
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
           content: '<span class="status_text">불가</span><span class="minute">(60분)</span>',
           class: 'impossible_class',
        },
        {
           start: '2022-05-16 11:10',
           end: '2022-05-16 12:10',
           content: '<span class="status_text">불가</span><span class="minute">(60분)</span>',
           class: 'impossible_class'
        },
        {
           start: '2022-05-17 08:10',
           end: '2022-05-17 12:10',
           content: '<span class="status_text">불가</span><span class="minute">(240분)</span>',
           class: 'impossible_class'
        },
        {
           start: '2022-05-17 12:10',
           end: '2022-05-17 13:05',
           content: '<span class="status_text">불가</span><span class="minute">(55분)</span>',
           class: 'impossible_class'
        },
        {
           start: '2022-05-18 08:30',
           end: '2022-05-18 11:55',
           content: '<span class="status_text">예약</span><span class="minute">(25분)</span>',
           class: 'possible_class'
        },
      ]);

      const currentDate = ref(new Date().getDate());

      const filterDate = (val) =>{
        const date = new Date(val);

        return date.getDate();
      }


      onMounted(()=>{
        events.forEach((val)=>{
          val['date'] = new Date(val.start).getDate();
        })
      })
   
    
    return{
      events,
      currentDate,
      filterDate
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
  margin: 0;
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

.vuecal__weekdays-headings{
  padding-right: 0;
  padding-left: 3.2em;
}

.vuecal__cell{
  padding: 0 4px;
}

.vuecal__cell:before{
  border: none;
}

.vuecal__cell--selected{
  background: none;
}

.vuecal__cell--today{
  background:none;
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
  font-size: 13px;
  font-weight: 500;
  color: #1f1f1f;
}

/*================= vue-cal 관련 css custom =================*/

.business-hours {
  background-color: rgba(255, 255, 0, 0.2);
  border: solid rgba(255, 210, 0, 0.6);
  border-width: 2px 0;
}

.impossible_class{
  color: #808080;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  #e8e8e8;
  border: 1px solid #fff;
}

.possible_class{
  color: #1f1f1f;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  #fae9c3;;
  border: 1px solid #fff;
}


.wait_class{
  color: #1f1f1f;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d5f1cd;
  border: 1px solid #fff;
}

.status{
  height: 10px;
}
.circle{
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.have_class{
  background-color: #e76d24;
}

.not_class{
  background-color: transparent;
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

.active{
  color: #e76d24;
}

.status_text{
  font-size: 14px;
  display: block;
}


.minute{
  font-size: 10px;
  display: block;
}

</style>
