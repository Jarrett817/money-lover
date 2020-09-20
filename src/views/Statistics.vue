<template>
  <layout>
    <Tabs class-prefix="chosen" :data-source="typeList" :value.sync="type"></Tabs>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      type:{{ type }}
      <br/>
      interval:{{ interval }}
    </div>
    <div>
      <ol>
        <li class="singleDay" v-for="(group,index) in result" :key="index">
          <div class="title">
            <span>{{ group.date }}</span>
            <span>{{ type + group.total }}</span>
          </div>
          <ol>
            <li class="eachItem" v-for="item in group.items" :key="item.id">
              <span>{{ item.tags }}</span>
              <span>{{ type + item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </layout>
</template>

<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import typeList from "@/constants/typeList";
import dayjs from "dayjs";

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  created() {
    this.$store.commit("fetchRecords");
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    this.$store.commit("SortList", this.type);
    return this.$store.state.sortedList;
  }

  beauty() {
    return;
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
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

  }
}

//deep语法将此加在Type子组件上
::v-deep .chosen-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>