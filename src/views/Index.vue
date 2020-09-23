<template>
  <Layout>
    <div class="content-wrapper">
      <TopBar field-name="记了个账"></TopBar>
      <MonthlyOverView class="over-view"></MonthlyOverView>
      <main>
        <span>今日账单</span>
        <div class="tabs-wrapper">
          <Tabs class-prefix="type"></Tabs>
        </div>
      </main>
      <RecordList class="list-css" :data-source="dataSource"></RecordList>
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

.over-view {
  border-bottom: 2px solid #e8e8e8;
  padding: 6px 1em;
}

.content-wrapper {
  height: 94%;
  display: flex;
  flex-direction: column;

  .list-css {
    flex-grow: 2;
    height: 100%;
  }


  > main {
    padding: 4px 0;
    display: flex;
    flex-direction: column;

    > span:first-child {
      color: grey;
      text-align: center;
    }

    .tabs-wrapper {
      border-bottom: 1px solid #e8e8e8;
      border-top: 1px solid #e8e8e8;
    }
  }


}

::v-deep .TopBar-wrapper .icon {
  visibility: hidden
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