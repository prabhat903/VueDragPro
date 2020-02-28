<template>
  <div ref="drag">
    <slot v-bind:handle="{'start':start}"></slot>
  </div>
</template>

<script>
import { setStyle } from "./helper";
import handle from "./handle";
export default {
  components: {
    handle
  },
  name: "Drag",
  data() {
    return {
      offset: {}
    };
  },
  props: {
    forward: { default: false },
    useHandle: { default: false }
  },
  provide() {
    return {
      start: this.start,
      drop: this.drop
    };
  },
  inject: ["center", "setContext", "clearContext", "findPositionInContainer"],
  methods: {
    start(event) {
      let position = this.findPositionInContainer(event),
        offset = this.getOffset(event),
        style = {
          top: position.y - offset.y + "px",
          left: position.x - offset.x + "px"
        };
      // console.log("start" + JSON.stringify(style));
      this.$el.classList.add("dragMe");
      setStyle.call(this.$el, style);
      this.setContext(this);
      this.$emit("onGrab", { Dragging: this, element: this.$el });
    },
    getOffset(event) {
      let cssStyle = window.getComputedStyle(this.$el),
        margin = {
          x: cssStyle.marginLeft,
          y: cssStyle.marginTop
        };
      if (!this.center) {
        this.offset = {
          x: event.offsetX + parseFloat(margin.x),
          y: event.offsetY + parseFloat(margin.y)
        };
      } else {
        this.offset = {
          x: this.$el.offsetWidth / 2 + parseFloat(margin.x),
          y: this.$el.offsetHeight / 2 + parseFloat(margin.y)
        };
      }

      return this.offset;
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
  cursor: move;
  position: absolute;
}
</style>
