<template>
  <div class="container" @mousemove="move" @mouseup="dropAny">
    <slot name="default"></slot>
  </div>
</template>
<script>
import { setStyle } from "./helper";
export default {
  name: "container",
  props: {
    center: {
      default: false
    }
  },
  data() {
    return {
      context: null,
      containerOffset: null,
      currentZone: null
    };
  },
  computed: {
    placeHolder() {
      let placeholder = this.$slots.placeHolder && this.$slots.placeHolder();
      if (!placeholder) {
        placeholder = this.$createElement(
          "div",
          { class: "defaultPlaceholder" },
          "Drop Here!"
        );
      }
      return placeholder;
    }
  },
  provide() {
    return {
      setContext: this.setContext,
      clearContext: this.clearContext,
      findPositionInContainer: this.findPositionInContainer,
      center: this.center,
      setZone: this.setZone,
      placeHolder: this.placeHolder
    };
  },
  methods: {
    setZone(context) {
      if (context) {
        context.$emit("onZoneEnter", context);
      } else if (this.currentZone) {
        this.currentZone.$emit("onZoneLeave", this.currentZone);
      }
      this.currentZone = context;
    },
    setContext(newContext) {
      this.context = newContext;
    },
    clearContext() {
      this.context = null;
      this.containerOffset = null;
    },
    dropAny() {
      if (this.context) this.context.drop();
    },
    findPositionInContainer(e) {
      let x = e.pageX - this.$el.offsetLeft,
        y = e.pageY - this.$el.offsetTop;
      if (!this.containerOffset) {
        let ele = this.$el.parentElement;
        this.containerOffset = { x: 0, y: 0 };
        while (ele.tagName.toLowerCase() !== "body") {
          this.containerOffset.x += ele.scrollLeft;
          this.containerOffset.y += ele.scrollTop;
          ele = ele.parentElement;
        }
      }
      x += this.containerOffset.x + this.$el.scrollLeft;
      y += this.containerOffset.y + this.$el.scrollTop;
      return {
        x,
        y
      };
    },
    move(e) {
      if (!this.context) return;
      let position = this.findPositionInContainer(e);
      let style = {
        top: position.y - this.context.offset.y + "px",
        left: position.x - this.context.offset.x + "px"
      };
      setStyle.call(this.context.$el, style);
      this.moveInZone(e);
      e.preventDefault();
    },
    moveInZone(e) {
      if (this.currentZone) {
        this.currentZone.hover(e);
      }
    }
  }
};
</script>

<style>
.container {
  position: relative;
}
.defaultPlaceholder {
  padding: 5px;
  border: 1px solid black;
  opacity: 0.5;
}
</style>
