
  <!-- <div @mousemove="hover" @mouseenter="onEnter" @mouseleave="onLeave">
    <template v-for="(ele,ind) in value">
      <slot name="placeholder" v-if="ind === loadat && isOver">{{placeHolder}}</slot>
      <Drag
        v-bind="$attrs"
        :key="(ele[keyName]||ele)+''+ind"
        v-slot="handle"
        :class="[className,'$ditem']"
        @onStart="(context)=>{setPlaceholder(ind,context)}"
        @onDrop="clearContext"
        @hover="context=>{onhover(ind,context)}"
      >
        <slot name="default" v-bind="{ind,ele,handle}">{{ele}}</slot>
      </Drag>
      <slot name="placeholder" v-if="ind === loadat && !isOver">{{placeHolder}}</slot>
    </template>
  </div> -->

<script>
import Drag from "./Drag";
export default {
  name: "DragList",
  components: {
    Drag
  },
  props: {
    value: { type: Array },
    keyName: { type: String },
    className: { type: String },
    ZoneName: {
      type: String
    }
  },
  created() {},
  render(h) {
    let list = this.value.map((ele, ind) => {
      return h(
        "Drag",
        {
          key: (ele[this.keyName] || ele) + "" + ind,
          class: "$ditem " + this.className,
          slot: { handle: this.handle },
          props: {
            ...this.$attrs
          },
          on: {
            onStart: context => {
              this.setPlaceholder(ind, context);
            },
            onDrop: this.clearContext,
            hover: context => {
              this.onhover(ind, context);
            }
          }
        },
        this.$slots.default || ele
      );
    });
    if (this.isDragging && this.placeAt !== null) {
      list.splice(
        this.isOver ? this.placeAt : this.placeAt + 1,
        0,
        this.placeHolder
      );
    }
    return h(
      "div",
      {
        on: {
          //mousemove: this.hover,
          mouseenter: this.onEnter
          //mouseleave: this.onLeave
        }
      },
      [this.$slots.head, list]
    );
  },
  inject: ["setZone", "placeHolder"],
  data() {
    return {
      Dragging: null,
      DraggingIndex: "",
      isDragging: false,
      tempList: [],
      loadat: null,
      placeAt: null,
      isOver: true
    };
  },
  methods: {
    onEnter(e) {
      //   console.log("Zone enter", this.ZoneName);
      this.setZone(this);
      //   this.$emit("onZoneEnter");
    },
    // onLeave() {
    //   this.setZone(null);
    // },
    hover(e) {
      console.log(this.ZoneName);
      if (!this.isDragging) return;
      //console.log("x,y", document.elementsFromPoint(e.clientX, e.clientY));

      let item = document
        .elementsFromPoint(e.clientX, e.clientY)
        .filter(ele => {
          return ele.classList.contains("$ditem") && ele !== this.Dragging.$el;
        });
      //console.log(item);
      if (!item.length) return;
      let dragListOver = item[0].parentElement;

      // let ind = [...e.currentTarget.children]
      if (dragListOver === this.$el) {
        this.setZone(this);
      } else {
        this.setZone(null);
      }
      let ind = [...dragListOver.children].indexOf(item[0]);

      // .filter(element => !element.classList.contains("$dplaceholder"))

      //console.log(ind);
      if (ind < 0) return;
      this.isOver = e.movementY <= 0;
      this.placeAt = this.isOver ? ind : ind - 1;
      this.loadat = ind < this.DraggingIndex ? this.placeAt + 1 : this.placeAt;
      //console.log(this.isOver, this.loadat);
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
      this.dropIn();
      this.isDragging = false;
      this.loadat = null;
      this.placeAt = null;
      this.$emit("onDrop", context);
    },
    dropIn() {
      if (!this.placeHolder) return;
      let tempList = this.value.filter(
          (ele, ind) => ind !== this.DraggingIndex
        ),
        temp = this.value.splice(this.DraggingIndex, 1);
      tempList.splice(
        this.loadat !== null
          ? this.isOver
            ? this.loadat - 1
            : this.loadat
          : this.DraggingIndex,
        0,
        temp[0]
      );
      this.$emit("input", tempList);
    }
  }
};
</script>

<style>
</style>
