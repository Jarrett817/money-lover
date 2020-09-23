<template>
  <layout>
    <div class="total-wrapper">
      <TopBar field-name="明细"></TopBar>
      <Tabs class-prefix="type"></Tabs>
      <RecordList :data-source="result"></RecordList>
    </div>
  </layout>
</template>

<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import TopBar from "@/components/TopBar.vue";
import RecordList from "@/components/RecordList.vue";

@Component({
  components: {RecordList, TopBar, Tabs}
})
export default class Statistics extends Vue {
  get chosenType() {
    return this.$store.state.currentType;
  }

  tagMark() {
    return this.chosenType === "-" ? "tag-mark-blue" : "tag-mark-red";
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  get result() {
    this.$store.commit("SortList", this.chosenType);
    return this.$store.state.sortedList;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.total-wrapper {
  height: 90vh;
  display: flex;
  flex-direction: column;

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

::v-deep .TopBar-wrapper .icon {
  visibility: hidden
}
</style>