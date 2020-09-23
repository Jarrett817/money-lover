<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="savaRecord"></NumberPad>

      <div class="notesWrapper">
        <Icon name="edit"></Icon>
        <FormItem field-name=""
                  placeholder="写备注..."
                  :value.sync="record.notes"
        ></FormItem>
      </div>
      <Tags :value.sync="record.tags"></Tags>
      <TopBar field-name="">
        <Tabs></Tabs>
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
import Tabs from "@/components/Tabs.vue";
import TopBar from "@/components/TopBar.vue";


@Component({
  components: {TopBar, Tabs, FormItem, Tags, NumberPad}
})
export default class Money extends Vue {
  created() {
    this.$store.commit("fetchRecords");
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get chosenType() {
    console.log("这是money获取到的vuex  type" + this.$store.state.currentType);
    return this.$store.state.currentType;
  }

  record: RecordItem = {tags: [], notes: "", type: "", amount: 0, createdTime: ""};

  //将各次收集到的数据对象存入数组
  savaRecord() {
    this.record.type = this.chosenType;

    if (this.record.tags.length === 0) {
      console.log(this.record.tags);
      this.record.tags.push({id: "0", name: "这是一条随性的记录..."});
    }
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
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
  padding: 2px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid grey;
  margin: 0 16px;

  .icon {
    width: 1em;
    margin-left: 8px;
  }
}
</style>