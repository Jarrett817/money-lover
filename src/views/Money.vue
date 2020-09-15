<template>
  <div>
    <Layout class-prefix="layout">
      <number-pad :value.sync="record.amount" @submit="savaRecord"></number-pad>
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
import {recordListModel} from "@/models/recordListModel.ts";
import {tagListModel} from "@/models/tagListModel.ts";

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: {Tags, Notes, Types, NumberPad}

})
export default class Money extends Vue {

  tags = tagList;
  record: RecordItem = {tags: [], notes: "", type: "-", amount: 0};
  //将各次收集到的数据对象存入数组
  recordList: RecordItem[] = recordList;

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;

  }

  onUpdateType(value: string) {
    this.record.type = value;
  }


  savaRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save(this.recordList);
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