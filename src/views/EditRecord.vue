<template>
  <div>
    <TopBar field-name="详情"></TopBar>
    <ul class="options">
      <li>类型：<span>{{ currentRecord ? (currentRecord.type === '-' ? '支出' : '收入') : '' }}</span></li>
      <li>金额：<span>{{ currentRecord?currentRecord.amount:'' }}</span></li>
      <li>日期：<span>{{ currentRecord?currentRecord.createdTime:'' }}</span></li>
      <li class="notes">备注：<span>{{ currentRecord?currentRecord.notes:'' }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import TopBar from "@/components/TopBar.vue";

@Component({
  components: {TopBar}
})
export default class EditRecord extends Vue {

  get currentRecord() {
    //TODO
    //刷新数据会消失，这里应该是通过路由获取到明细页的两个id，然后在这里去调用store，每次重新获取
    return this.$store.state.currentRecord;
  }
}
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 500px;
  padding: 10px 20px;

  > li {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid lighten(grey, 20%);
    margin-bottom: 10px;
    line-height: 100px;

    &.notes {
      height: 200px;
      line-height: 200px;
    }
  }
}
</style>