<template>
  <div class="container" @mousemove="move" @mouseup="context.drop">
    <slot></slot>
  </div>
</template>

<script>
import { setStyle } from "./helper";
export default {
  name: "container",
  data() {
    return {
      context: null
    };
  },
  provide() {
    return {
      setContext: this.setContext,
      clearContext: this.clearContext
    };
  },
  methods: {
    setContext(newContext) {
      this.context = newContext;
    },
    clearContext() {
      this.context = null;
    },
    move(e) {
      if (!this.context) return;
      let style = {
        top: e.y + "px",
        left: e.x + "px"
      };
      setStyle.call(this.context.$el, style);
    }
  }
};
</script>

<style>
.container {
  position: relative;
  border: 1px solid black;
  height: 100px;
  width: 200px;
}
</style>
