<template>
  <div class="container" @mousemove="move" @mouseup="dropAny">
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
    dropAny() {
      if (this.context) this.context.drop();
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
