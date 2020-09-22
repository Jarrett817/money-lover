<template>
  <layout>
    <div class="total-wrapper">
      <div class="top-wrapper">
        <TopBar field-name="明细"></TopBar>
        <Tabs class-prefix="type"></Tabs>
      </div>
      <div class="list-wrapper">
        <ol>
          <li class="singleDay" v-for="(group,groupIndex) in result" :key="groupIndex">
            <div class="title">
              <span>{{ group.date }}</span>
              <span>{{ group.total ? chosenType + group.total : 0 }}</span>
            </div>
            <ol>
              <router-link class="eachItem" v-for="(item,itemIndex) in group.items" :key="itemIndex"
                           :to="`/statistics/edit/${groupIndex}/${itemIndex}`"
              >
                <ol>
                  <li :class="tagMark()" v-for="tag in item.tags" :key="tag.id">
                    <span>{{ tag.name }}</span>
                  </li>

                </ol>
                <span :class="chosenType==='-'?'expend':'income'">{{
                    item.amount ? chosenType + item.amount : chosenType + 0
                  }}</span>
              </router-link>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import dayjs from "dayjs";
import TopBar from "@/components/TopBar.vue";

@Component({
  components: {TopBar, Tabs}
})
export default class Statistics extends Vue {
  get chosenType() {
    return this.$store.state.currentType;
  }

  // created() {
  //   this.$store.commit("fetchRecords");
  // }
  tagMark() {
    return this.chosenType === "-" ? "tag-mark-blue" : "tag-mark-red";
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    this.$store.commit("SortList", this.chosenType);
    return this.$store.state.sortedList;
  }

  beauty() {
    return;
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.total-wrapper{
  height:100%;
  display: flex;
  flex-direction: column;
}
.list-wrapper {
  overflow: auto;
}

.singleDay {
  padding: 10px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: grey;
    border-bottom: 1px solid lightgrey;
  }

  .eachItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    padding: 4px;

    .tag-mark-red {
      border-left: 2px solid $main-red;
      padding-left: 3px;
    }

    .tag-mark-blue {
      border-left: 2px solid $main-blue;
      padding-left: 3px;
    }

    > span.income {
      color: $main-red;
    }

    > span.expend {
      color: $main-blue;
    }
  }
}

//deep语法将此加在Type子组件上
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }

}
</style>