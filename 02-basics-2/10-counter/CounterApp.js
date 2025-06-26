import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0)

    function inc() {
      count.value += 1;
      console.log("count.value.count=", count.value);
    }

    function dec() {
      count.value -= 1;
      console.log("count.value.count=", count.value);
    }

    return {
      count,
      inc,
      dec,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="count <= 0"
        @click="dec"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="count >= 5"
        @click="inc"
      >➕</button>
    </div>
  `,
})
