<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="savaRecord"></NumberPad>
      <Types :value.sync="record.type"></Types>
      <div class="notesWrapper">
        <FormItem field-name="备注"
                  placeholder="..."
                  @update:value="onUpdateNotes"></FormItem>
      </div>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    </Layout>
  </div>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import {recordListModel} from "@/models/recordListModel.ts";
import {tagListModel} from "@/models/tagListModel.ts";

const recordList = recordListModel.fetch();
tagListModel.fetch();
@Component({
  components: {FormItem, Tags, Notes: FormItem, Types, NumberPad}

})
export default class Money extends Vue {

  tags = tagListModel.data;
  record: RecordItem = {tags: [], notes: "", type: "-", amount: 0};
  //将各次收集到的数据对象存入数组
  recordList: RecordItem[] = recordList;

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;

  }

  savaRecord() {
    recordListModel.create(this.record);
  }

  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save();
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
.notesWrapper {
  padding: 12px 0;
}
</style>