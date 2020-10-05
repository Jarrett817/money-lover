<template>
  <Layout>
    <TopBar field-name="月报" icon-hidden="true"></TopBar>
    <div id="chartWrapper">
      <EChart :options="x"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import EChart from "@/components/Echart.vue";
import TopBar from "@/components/TopBar.vue";
import dayjs from "dayjs";
import beautyMonth from "@/lib/beautyMonth";

@Component({
  components: {TopBar, EChart}
})
export default class Chart extends Vue {
  colors: string[] = ["#5793f3", "#d14a61", "#675bba"];

  get daysInMonth() {
    const num = dayjs(new Date()).daysInMonth();
    const days = [];
    for (let i = 0; i < num; i++) {
      days.push((i + 1));
    }
    return days;
  }

  getMonthlyRecords(type: string) {
    this.$store.commit("fetchRecords");
    const {state} = this.$store;
    const today = new Date().toISOString();
    const hashMap: { [id: string]: number } = {"": 0};
    const results = [];
    const days = this.daysInMonth;
    const records = state.recordList.filter((item: RecordItem) =>
        beautyMonth(item.date) === beautyMonth(today)
    );
    //筛选除同一个月内同类型的记录，计数
    records.filter((item: RecordItem) => item.type === type).forEach((item: RecordItem) => {
      //获取当前项是哪天
      const day = (dayjs(item.date).date() - 1).toString();
      if (!hashMap[day]) {
        hashMap[day] = 0;
        hashMap[day] += item.amount;
      } else {
        hashMap[day] += item.amount;
      }
    });
    for (let i = 0; i < days.length; i++) {
      if (hashMap[i]) {
        results.push(hashMap[i]);
      } else {
        results.push(0);
      }
    }
    return results;
  }

  get dailyIncomeInMonth() {
    return this.getMonthlyRecords("+");
  }

  get dailyExpendInMonth() {
    return this.getMonthlyRecords("-");
  }


  get x() {
    return {
      color: this.colors,

      tooltip: {
        trigger: "none",
        axisPointer: {
          type: "cross"
        }
      },
      legend: {
        data: ["本月支出", "本月收入"]
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: this.colors[1]
            }
          },
          axisPointer: {
            label: {
              formatter: function (params: { value: string; seriesData: string | any[] }) {
                return params.value + "日收入"
                    + (params.seriesData.length ? "：" + params.seriesData[0].data : "：0.00");
              }
            }
          },
          data: this.daysInMonth
        },
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: this.colors[0]
            }
          },
          axisPointer: {
            label: {
              formatter: function (params: { value: string; seriesData: string | any[] }) {
                return params.value + "日支出"
                    + (params.seriesData.length ? "：" + params.seriesData[0].data : "：0.00");
              }
            }
          },
          data: this.daysInMonth
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "本月支出",
          type: "line",
          xAxisIndex: 1,
          smooth: true,
          data: this.dailyExpendInMonth
        },
        {
          name: "本月收入",
          type: "line",
          smooth: true,
          data: this.dailyIncomeInMonth
        }
      ]
    };

  }

}
</script>

<style lang="scss" scoped>
#chartWrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>