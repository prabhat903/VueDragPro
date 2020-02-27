<template>
  <div ref="drag" @mousedown="start" @mouseup="drop">
    <slot></slot>
  </div>
</template>

<script>
import { setStyle } from "./helper";
export default {
  name: "Drag",
  inject: ["setContext", "clearContext"],
  methods: {
    start(event) {
      let style = {
        top: event.y + "px",
        left: event.x + "px"
      };
      this.$el.classList.add("dragMe");
      setStyle.call(this.$el, style);
      this.setContext(this);
    },
    drop() {
      this.clearContext();
      this.$el.classList.remove("dragMe");
    }
  }
};
</script>

<style>
.dragMe {
  border: 1px solid black;
  cursor: move;
  position: absolute;
}
</style>
