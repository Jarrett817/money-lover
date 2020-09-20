<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="savaRecord"></NumberPad>

      <div class="notesWrapper">
        <FormItem field-name="备注"
                  placeholder="..."
                  @update:value="onUpdateNotes"></FormItem>
      </div>
      <Tags :value.sync="record.tags"></Tags>
      <TopBar field-name="">
        <Tabs :data-source="typeList"
        ></Tabs>
      </TopBar>
    </Layout>
  </div>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import typeList from "@/constants/typeList";
import Tabs from "@/components/Tabs.vue";
import TopBar from "@/components/TopBar.vue";


@Component({
  components: {TopBar, Tabs, FormItem, Tags, Notes: FormItem, NumberPad}
})
export default class Money extends Vue {
  created() {
    this.$store.commit("fetchRecords");
  }

  get recordList() {
    return this.$store.state.recordList;
  }
  get chosenType(){
    console.log('这是money获取到的vuex  type'+this.$store.state.currentType)
    return this.$store.state.currentType;
  }
  record: RecordItem = {tags: [], notes: "", type: '', amount: 0};
  //将各次收集到的数据对象存入数组
  typeList = typeList;

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  savaRecord() {
    this.record.type=this.chosenType;
    this.$store.commit("createRecord", this.record);
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