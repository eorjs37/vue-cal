<template>
  <h1>
    Vue-cal
  </h1>
  <button @click="changeView('day')">일별</button>
  <button @click="changeView('week')">주별</button>
  <button @click="stickySplitLabels = !stickySplitLabels">Change</button>
  <div class="date_head">
    <h1 class="title">
      <span @click="calendar.setVisible()">Head</span>
      <div class="calendar" v-if="calendar.isVisible">
        <VueCal class="cal" :time="false" active-view="month" :disable-views="['years', 'year','week','day']">

        </VueCal>
      </div>  
    </h1>
  </div>
  <VueCal :time-from="9 * 60" 
          :time-to="19 * 60"  
          :disable-views="['years', 'year', 'month']"
          :time-cell-height="60"
          hide-view-selector
          hide-title-bar
          hide-weekends
          locale="ko"
          :time-step="30"
          :events="events"
          :split-days="splitLabels"
          :sticky-split-labels="stickySplitLabels"
          :min-cell-width="minCellWidth"
          :min-split-width="minSplitWidth"
          ref="vuecal">

          <template v-slot:weekday-heading="{ heading }">
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

          <template v-slot:split-label="{ split }">
            <strong :style="`color: ${split.color}`">{{ split.label }}</strong>
          </template>
  </VueCal>

  <h1 class="title">달력</h1>
  <div>
    <VueCal class="cal" :time="false" active-view="month" :disable-views="['years', 'year','week','day']">

    </VueCal>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
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
    const vuecal = ref(null);
    const stickySplitLabels = ref(true);
    
    const splitLabels = reactive([]);

    const events = reactive([
        {
           start: '2022-05-31 09:00',
           end: '2022-05-31 10:10',
           content: '<span class="status_text">불가</span><span class="minute">(60분)</span>',
           class: 'impossible_class',
           split: 1
        },
        {
           start: '2022-05-23 11:10',
           end: '2022-05-23 12:10',
           content: '<span class="status_text">불가</span><span class="minute">(60분)</span>',
           class: 'impossible_class',
           split: 1
        },
        {
           start: '2022-05-24 08:10',
           end: '2022-05-24 12:10',
           content: '<span class="status_text">불가</span><span class="minute">(240분)</span>',
           class: 'impossible_class',
           split: 2
        },
        {
           start: '2022-05-24 12:10',
           end: '2022-05-24 13:05',
           content: '<span class="status_text">불가</span><span class="minute">(55분)</span>',
           class: 'impossible_class',
           split: 2
        },
        {
           start: '2022-05-25 08:30',
           end: '2022-05-25 11:55',
           content: '<span class="status_text">예약</span><span class="minute">(25분)</span>',
           class: 'possible_class',
           split: 3  
        },
        {
           start: '2022-05-26 08:30',
           end: '2022-05-26 11:55',
           content: '<span class="status_text">예약</span><span class="minute">(25분)</span>',
           class: 'possible_class',
           split: 3
        },
      ]);

      const currentDate = ref(new Date().getDate());

      const filterDate = (val) =>{
        const date = new Date(val);

        return date.getDate();
      }

      const customDaySplitLabels = reactive(
        [
          { label: 'John', color: 'blue', class: 'split1' },
          { label: 'Tom', color: 'green', class: 'split2' },
          { label: 'Kate', color: 'orange', class: 'split3' },
          { label: 'Jess', color: 'red', class: 'split4' }
        ]
      );

      const minCellWidth = ref(200);
      const minSplitWidth = ref(200);

      const changeView = (view) =>{
        const  { switchView } = vuecal.value;
        if(view === 'day'){
          switchView(view,new Date());
        }
        else{
          switchView(view);
        }
      }

      const modal = () =>{
        alert('팝업 클릭');
      }

      //캘린더 관련한 객체
      const calendar = reactive({
         //달력 visible
         isVisible:false,
         setVisible: ()=>{
           calendar.isVisible = !calendar.isVisible
         }
      })


      onMounted(()=>{
        events.forEach((val)=>{
          val['date'] = new Date(val.start).getDate();
        }); 
      });
   
    
    return{
      vuecal,
      splitLabels,
      stickySplitLabels,
      events,
      currentDate,
      filterDate,
      changeView,
      modal,
      calendar,
      customDaySplitLabels,
      minCellWidth,
      minSplitWidth
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

.title{
  text-align: center;
}
/*================= vue-cal css custom =================*/
.vuecal {
   background-color: #f7f7f7;
    height: 100%;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
     padding: 13px 30px;
}

/* weekday-head */
.vuecal__heading {height: 140px !important;}


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

.vuecal--overflow-x.vuecal--week-view .vuecal__time-column{
  margin-top: 9.1em;
}

/* margin-top 수정 */
.vuecal--overflow-x.vuecal--week-view.vuecal--sticky-split-labels .vuecal__time-column{
  margin-top: 9.1em;
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


.cal{
  background-color: #fff;
}

.date_head{
  display: flex;
  align-items: center;
  justify-content: center;
}

.date_head > .title{
  cursor: pointer;
  position: relative;
}

.date_head > .title > .calendar{
  position: absolute;
  top: 50px;
  z-index: 999;
}
</style>
