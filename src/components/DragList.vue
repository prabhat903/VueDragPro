<template>
  <div>
    <Drag
      v-bind="$attrs"
      v-for="(ele,ind) in list"
      :key="(ele[keyName]||ele)+ind"
      v-slot="handle"
      :class="className"
      @onGrab="setPlaceholder"
    >
      <slot v-bind="{ele,handle}">{{ele}}</slot>
    </Drag>
  </div>
</template>
<script>
import Drag from "./Drag";
export default {
  components: {
    Drag
  },
  props: {
    list: { type: Array },
    keyName: { type: String },
    className: { type: String }
  },
  data() {
    return {
      tempList: []
    };
  },
  methods: {
    setPlaceholder({ Dragging, element }) {
      this.$emit("onGrab", { Dragging, element });
    }
  }
};
</script>

<style>
</style>
