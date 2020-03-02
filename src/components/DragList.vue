<template>
  <div>
    <template v-for="(ele,ind) in list">
      <slot name="placeholder" v-if="ind === loadat && isOver"></slot>
      <Drag
        v-bind="$attrs"
        :key="(ele[keyName]||ele)+ind"
        v-slot="handle"
        :class="className"
        @onStart="(context)=>{setPlaceholder(ind,context)}"
        @onDrop="clearContext"
        @hover="context=>{onhover(ind,context)}"
      >
        <slot name="default" v-bind="{ind,ele,handle}">{{ele}}</slot>
      </Drag>
      <slot name="placeholder" v-if="ind === loadat && !isOver"></slot>
    </template>
  </div>
</template>
<script>
import Drag from "./Drag";
import Vue from "vue";
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
      DraggingIndex: "",
      isDragging: false,
      tempList: [],
      loadat: "",
      isOver: true
    };
  },
  methods: {
    onhover(ind, { event, Dragging }) {
      if (this.DraggingIndex === ind) return;
      this.loadat = this.isDragging ? ind : null;
      this.isOver = event.movementY <= 0;
      console.log(ind);
    },
    setPlaceholder(ind, { Dragging, element }) {
      this.isDragging = true;
      this.DraggingIndex = ind;
      this.$emit("onStart", { Dragging, element });
    },
    clearContext(context) {
      this.isDragging = false;
      this.loadat = null;
      this.$emit("onDrop", context);
    }
    // addAt(reference, ele, position) {
    //   // console.log(reference, ele, position);
    //   let loc = position === "before" ? reference : reference.nextSibling;
    //   this.$el.insertBefore(ele, loc);
    // }
  }
};
</script>

<style>
</style>
