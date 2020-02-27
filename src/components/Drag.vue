<template>
  <div ref="drag" @mousedown="start">
    <slot></slot>
  </div>
</template>

<script>
import { setStyle } from "./helper";
export default {
  name: "Drag",
  props: {
    forward: { default: false }
  },
  inject: ["setContext", "clearContext", "findPositionInContainer"],
  methods: {
    start(event) {
      let position = this.findPositionInContainer(event);

      let style = {
        top: position.y - event.offsetY + "px",
        left: position.x - event.offsetX + "px"
      };
      // console.log("start" + JSON.stringify(style));
      this.$el.classList.add("dragMe");
      setStyle.call(this.$el, style);
      this.setContext(this);
    },
    drop() {
      this.clearContext();
      if (this.forward) return;
      this.$el.classList.remove("dragMe");
      this.$el.removeAttribute("style");
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
