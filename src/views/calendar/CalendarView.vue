<template>
    <van-calendar title="日历" color="#1989fa" :min-date="minDate" :max-date="maxDate" :poppable="false"
        :show-confirm="false" :formatter="formatter" @select="SelectDate" @month-show="monthShow">
        <template v-slot:top-info="day">
            <van-icon v-show="day.topInfo > 0" class="tips" color="red" name="bell" />
        </template>
    </van-calendar>
</template>
<script>
import { useWindowSize } from '@vant/use';
import { ref, onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { calendar } from '@/plugin/calendar'
import { getPreMonths, getNextMonths } from '@/util/date'

export default {
    name: 'CalendarView',
    setup() {

        const store = useStore();

        const vheight = ref('100%');
        const { height } = useWindowSize();
        //获取日历数据
        const caleListData = reactive({});
        const getCaleListData = async (Year, Month) => {
            const listData = await store.dispatch('getNoteListNearMonth', { Year: Year, Month: Month });
            console.log('getNoteListNearMonth=>' + JSON.stringify(listData));
            var YearMonthData1 = [];
            var YearMonthData2 = [];
            var YearMonthData3 = [];
            const preData = getPreMonths(Year, Month);
            const nextData = getNextMonths(Year, Month);
            for (let index = 0; index < listData.length; index++) {
                const item = listData[index];
                if (item.Year == Year && item.Month == Month) {
                    YearMonthData1.push(item);
                } else if (item.Year == preData.Year && item.Month == preData.Month) {
                    YearMonthData2.push(item);
                } else if (item.Year == nextData.Year && item.Month == nextData.Month) {
                    YearMonthData3.push(item);
                }
            }
            caleListData[`${Year}-${Month}`] = YearMonthData1;
            caleListData[`${preData.Year}-${preData.Month}`] = YearMonthData2;
            caleListData[`${nextData.Year}-${nextData.Month}`] = YearMonthData3;
            //console.log('caleListData=>' + JSON.stringify(caleListData));
        };
        getCaleListData(new Date().getFullYear(), new Date().getMonth() + 1);


        onMounted(() => {
            vheight.value = height.value - 80 + 'px';
        })

        const formatter = computed(() => {
            return (day) => {
                const _time = new Date(day.date);
                const y = _time.getFullYear();
                const m = _time.getMonth() + 1;
                const d = _time.getDate();
                const w = _time.getDay();
                //   改变周六周日显示颜色
                if (w === 0 || w === 6) {
                    day.className = "weekendRed";
                }
                const info = calendar.solar2lunar(y, m, d);
                //console.log(info);

                const ntime = new Date();
                const ny = ntime.getFullYear();
                const nm = ntime.getMonth() + 1;
                const nd = ntime.getDate();

                if (y == ny && m == nm && d == nd) {
                    day.className += " today";
                }

                //   优先级:节日>节气>农历
                if (info.festival != null && info.festival != "") {
                    day.bottomInfo = info.festival;
                } else if (info.Term != null && info.Term != "") {
                    day.bottomInfo = info.Term;
                } else if (info.IDayCn != null && info.IDayCn != "") {
                    day.bottomInfo = info.IDayCn;
                }
                hasData(day, y, m, d);
                //console.log('测试Calendar');
                return day;
            };
        });

        //选择日期
        const SelectDate = (value) => {
            const _time = new Date(value);
            const y = _time.getFullYear();
            const m = _time.getMonth() + 1;
            const d = _time.getDate();
            // const w = _time.getDay();
            console.log([y, m, d].join('-'));

        };
        const monthShow = (data) => {
            console.log('monthShow');
            console.log(JSON.stringify(data));
            getCaleListData(data.date.getFullYear(), data.date.getMonth() + 1);
        };


        const hasData = (day, y, m, d) => {
            var data = caleListData[`${y}-${m}`];
            //console.log('hasData=>' + y + ',' + m + ' = ' + JSON.stringify(data));
            if (data && data.length > 0) {
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    if (item.Day == d) {
                        day.topInfo = 1;
                        break;
                    }
                }
            } else {
                day.topInfo = 0;
            }
        };

        const nowDate = new Date();
        return {
            vheight,
            minDate: new Date(nowDate.getFullYear() - 3, 0, 1),
            maxDate: new Date(nowDate.getFullYear() + 3, 11, 31),
            formatter,
            SelectDate,
            monthShow,
        };
    }
}
</script>
<style lang="less">
#app {

    .van-calendar {
        width: 100%;
        height: v-bind("vheight");

        .weekendRed {
            color: red;
        }

        .today {
            color: rgb(23, 148, 250);
        }

        .tips {
            position: absolute;
            top: 8px;
            right: 8px;
        }
    }
}
</style>