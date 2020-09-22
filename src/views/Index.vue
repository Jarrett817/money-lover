<template>
  <Layout>
    <div class="content-wrapper">
      <TopBar field-name="记了个账"></TopBar>
      <header>
        <h2>xx月·支出</h2>
        <h1>0.00</h1>
        <h2>xx月·收入 <span>0.00</span></h2>
      </header>
      <main>
        <span>今日账单</span>
        <div class="tabs-wrapper">
          <Tabs class-prefix="type"></Tabs>
        </div>
      </main>
      <RecordList class="list-css" :data-source="dataSource"></RecordList>
      <footer>
        <label>今日收入
          <div class="income">
            <span>￥</span>
            <Icon name="wave"></Icon>
          </div>

        </label>
        <div class="line"></div>
        <label>今日支出
          <div class="expend">
            <span>￥</span>
            <Icon name="wave"></Icon>
          </div>

        </label>
      </footer>
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

@Component({
  components: {Tabs, RecordList, TopBar}
})
export default class Index extends Vue {
  get chosenType() {
    return this.$store.state.currentType;
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  created() {
    this.$store.commit("getDailyRecords", dayjs(new Date()).format("YYYY-MM-DD"));
  }

  get dataSource() {
    this.$store.commit("SortList", this.chosenType);
    //获取当天的日期
    return this.$store.state.sortedList;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.content-wrapper {
  height: 97%;
  display: flex;
  flex-direction: column;

  .list-css {
    flex-grow: 2;
    height:100%;
  }

  > header {
    > h1 {
      color: $main-blue;
    }

    > h2 > span {
      color: $main-red;
    }
  }

  > main {
    padding: 10px 0 0 0;
    display: flex;
    flex-direction: column;

    > span:first-child {
      color: grey
    }

    .tabs-wrapper {
      border-bottom: 1px solid #e8e8e8;
      border-top: 1px solid #e8e8e8;
    }
  }

  > footer {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .line {
      height: 50%;
      width: 2px;
      background: lightgrey;
    }
    & > label {
      padding: 10px 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      color: grey;

      & .icon {
        width: 100%;
        transform: scale(4);
      }
      & .income {
        text-align: center;
        color: $main-red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > span {
          padding: 2px;

        }
      }
      & .expend {
        text-align: center;
        color: $main-blue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > span {
          padding: 2px;
        }
      }


    }


  }

}
::v-deep .TopBar-wrapper .icon {
  display: none;
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