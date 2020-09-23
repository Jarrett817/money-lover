<template>
  <Layout class-prefix="layout">
    <div class="total-wrapper">
      <TopBar field-name="">
        <Tabs></Tabs>
      </TopBar>
      <Tags :value.sync="record.tags"></Tags>
      <div class="notesWrapper">
        <Icon name="edit"></Icon>
        <FormItem field-name=""
                  placeholder="写备注..."
                  :value.sync="record.notes"
        ></FormItem>
      </div>

      <NumberPad :value.sync="record.amount" @submit="savaRecord"></NumberPad>

    </div>
  </Layout>
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
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  flex-direction: column;
  height:100%;
}

.notesWrapper {
  padding: 2px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid grey;
  margin: 0 16px;

  .icon {
    margin-left: 8px;
  }
}
::v-deep .TopBar-wrapper .icon {
  visibility: hidden
}
::v-deep .tabs {
  background: inherit;
  display: flex;
  font-size: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;


  > li {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0;
  }
}
</style>