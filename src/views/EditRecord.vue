<template>
  <div>
      <TopBar field-name="详情"></TopBar>
      <ul class="options">
        <li><span>类型：</span><span>{{ record.type === '-' ? '支出' : '收入' }}</span></li>
        <li><span>金额：</span><span>{{ record.amount === null ? 0 : record.amount.toFixed(2) }}</span></li>
        <li><span> 日期：</span><span>{{ beautyDay(record.date) }}</span></li>
        <li class="notes"><span>备注：</span><span class="content">{{ record.notes }}</span></li>
      </ul>
      <div class="buttonWrapper">
        <Button button-type="danger" @click="removeRecord">删除记录</Button>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import TopBar from "@/components/TopBar.vue";
import dayjs from "dayjs";
import Button from "@/components/Button.vue";

@Component({
  components: {Button, TopBar}
})
export default class EditRecord extends Vue {
  groupIndex = 0;
  itemIndex = 0;
  record?: RecordItem=this.currentRecord
  get currentRecord() {
    this.groupIndex = parseInt(this.$route.params.groupIndex);
    this.itemIndex = parseInt(this.$route.params.itemIndex);
    this.$store.commit("setCurrentRecord", {groupIndex: this.groupIndex, itemIndex: this.itemIndex});
    //刷新数据会消失，这里应该是通过路由参数获取到明细页的两个id，然后在这里去调用store，每次重新获取
    return this.$store.state.currentRecord;
  }

  removeRecord() {
    this.$store.commit("removeRecord", this.$store.state.currentRecord.createdTime);
  }

  beautyDay(day: string) {
    return dayjs(day).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.buttonWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: fit-content;
  padding: 10px 20px;
  position: relative;

  > li {
    $h: 50px;
    width: 100%;
    height: $h;
    line-height: $h;
    border-bottom: 1px solid lighten(grey, 35%);
    margin-bottom: 10px;

    & > span:nth-child(1) {
      color: grey;
    }

    &.notes {
      height: fit-content;
      display: flex;
      align-items: stretch;

      & > span:nth-child(1) {
        white-space: nowrap;
      }

      .content {
        display: inline-block;
        width: 100%;
        white-space: pre-wrap;
      }
    }
  }
}
</style>