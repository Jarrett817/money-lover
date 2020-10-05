<template>
  <Layout>
    <div class="topBar-wrapper">
      <TopBar field-name="记了个账" icon-hidden="true"></TopBar>
    </div>
    <div class="monthly-over-view">
      <MonthlyOverView class="over-view"></MonthlyOverView>
    </div>
    <main>
      <span>今日账单</span>
      <div class="tabs-wrapper">
        <Tabs class-prefix="type"></Tabs>
      </div>
    </main>
    <div class="list-css-wrapper">
      <RecordList :data-source="dataSource"></RecordList>
    </div>
    <div class="daily-view-wrapper">
      <DailyOverView></DailyOverView>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import TopBar from "@/components/TopBar.vue";
import RecordList from "@/components/RecordList.vue";
import dayjs from "dayjs";
import Tabs from "@/components/Tabs.vue";
import MonthlyOverView from "@/components/IndexPage/MonthlyOverView.vue";
import DailyOverView from "@/components/IndexPage/DailyOverView.vue";

@Component({
  components: {DailyOverView, MonthlyOverView, Tabs, RecordList, TopBar}
})
export default class Index extends Vue {
  get chosenType() {
    return this.$store.state.currentType;
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  getDailyRecords(whichDay: string) {
    const {state} = this.$store;
    this.$store.commit("SortList", state.currentType);
    state.sortedList = state.sortedList.filter((group: DetailedRecord) => {
      return group.date === whichDay;
    });
  }

  get dataSource() {
    this.$store.commit("SortList", this.chosenType);
    this.getDailyRecords(dayjs(new Date()).format("YYYY-MM-DD"));
    //获取当天的日期
    return this.$store.state.sortedList;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.monthly-over-view {
  padding: 6px 1em;
}

.list-css-wrapper {
  display:flex;
  flex:6 1 200px;
  overflow: auto;
}

.daily-view-wrapper {
  flex-shrink: 0;
  flex-grow: 1;
}

main {
  padding: 4px 0;
  display: flex;
  flex-direction: column;

  > span:first-child {
    color: grey;
    text-align: center;
    border-top: 2px solid #e8e8e8;
  }

  .tabs-wrapper {
    border-bottom: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
  }
}
//deep语法将此加在Type子组件上
::v-deep .type-tabs-item {
  background: #f5f5f5;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }

}
</style>