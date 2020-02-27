<template>
  <div ref="drag" @mousedown="start">
    <slot></slot>
  </div>
</template>

<script>
import { setStyle } from "./helper";
export default {
  name: "Drag",
  data() {
    return {
      offset: {}
    };
  },
  props: {
    forward: { default: false }
  },
  inject: ["setContext", "clearContext", "findPositionInContainer"],
  methods: {
    start(event) {
      let position = this.findPositionInContainer(event),
        style;
      this.offset = {
        x: event.offsetX,
        y: event.offsetY
      };
      style = {
        top: position.y - this.offset.y + "px",
        left: position.x - this.offset.x + "px"
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
