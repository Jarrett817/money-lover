<template>
  <div>
    <TopBar field-name="详情"></TopBar>
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
    return this.$store.state.currentRecord;
  }
}
</script>

<style lang="scss" scoped>

</style>