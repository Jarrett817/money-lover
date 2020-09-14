<template>
  <div>
    <Layout class-prefix="layout">
      <number-pad @update:value="onUpdateAmount" @submit="savaRecord"></number-pad>
      <types :value.sync="record.type"></types>
      <Notes @update:value="onUpdateNotes"></Notes>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    </Layout>
  </div>
</template>

<script lang="ts">

import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import {model} from "@/model";

const recordList: RecordItem[] = model.fetch();
@Component({
  components: {Tags, Notes, Types, NumberPad}

})
export default class Money extends Vue {

  tags = ["衣", "食", "住", "行"];
  record: RecordItem = {tags: [], notes: "", type: "-", amount: 0};
  //将各次收集到的数据对象存入数组
  recordList: RecordItem[] = recordList;

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;

  }

  // onUpdateType(value: string) {
  //   this.record.type = value;
  // }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  savaRecord() {
    const record2: RecordItem = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.record);
  }

  @Watch("recordList")
  onRecordListChanged() {
    model.save(this.recordList);
  }
}

</script>
<style lang="scss">

.layout-content {
  display: flex;
  flex-direction: column-reverse;

}
</style>
<style lang="scss" scoped>

</style>