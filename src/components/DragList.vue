<template>
  <div @mousemove="hover">
    <template v-for="(ele,ind) in list">
      <slot name="placeholder" v-if="ind === loadat && isOver"></slot>
      <Drag
        v-bind="$attrs"
        :key="(ele[keyName]||ele)+ind"
        v-slot="handle"
        :class="[className,'$ditem']"
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
export default {
  components: {
    Drag
  },
  props: {
    list: { type: Array },
    keyName: { type: String },
    className: { type: String }
  },
  inject: [],
  data() {
    return {
      Dragging: null,
      DraggingIndex: "",
      isDragging: false,
      tempList: [],
      loadat: "",
      isOver: true
    };
  },
  methods: {
    hover(e) {
      if (!this.isDragging) return;
      // console.log(document.elementsFromPoint(e.clientX, e.clientY));
      let item = document
        .elementsFromPoint(e.clientX, e.clientY)
        .filter(ele => {
          return ele.classList.contains("$ditem") && ele !== this.Dragging.$el;
        });
      // console.log(item);
      // console.log(e.currentTarget.children);
      let ind = [...e.currentTarget.children]
        // .filter(element => !element.classList.contains("$dplaceholder"))
        .indexOf(item[0]);
      // console.log(ind);
      if (ind < 0) return;
      this.isOver = e.movementY <= 0;
      this.loadat = this.isOver ? ind : ind - 1;
    },
    onhover(ind, { event, Dragging }) {
      // console.log(this.DraggingIndex, ind);
      // if (this.DraggingIndex === ind) return;
      // this.loadat = this.isDragging ? ind : null;
      // this.isOver = event.movementY <= 0;
    },
    setPlaceholder(ind, { Dragging, element }) {
      this.$nextTick(() => {
        this.isDragging = true;
        this.Dragging = Dragging;
        this.DraggingIndex = ind;
      });
      this.$emit("onStart", { Dragging, element });
    },
    clearContext(context) {
      this.isDragging = false;
      this.loadat = null;
      this.$emit("onDrop", context);
    }
  }
};
</script>

<style>
</style>
