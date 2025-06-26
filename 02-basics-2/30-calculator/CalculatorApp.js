import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const result = ref(0);
    const operand1 = ref(0);
    const operand2 = ref(0);
    const operator = ref('sum');

    watch(([operand1, operand2, operator]), () => {
      if (operator.value === 'sum') {
        result.value = parseInt(operand1.value) + parseInt(operand2.value);
      } else if (operator.value === 'subtract') {
        result.value = parseInt(operand1.value) - parseInt(operand2.value);
      } else if (operator.value === 'multiply') {
        result.value = parseInt(operand1.value) * parseInt(operand2.value);
      } else if (operator.value === 'divide') {
        result.value = parseInt(operand1.value) / parseInt(operand2.value);
      }
    }, {deep: true}
    )

    return {
      result,
      operand1,
      operand2,
      operator,
    }

  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="operand1"/>

      <div class="calculator__operators">
        <label><input type="radio" v-model="operator" name="operator" value="sum" v-bind:checked="operator === 'sum'"/>➕</label>
        <label><input type="radio" v-model="operator" name="operator" value="subtract" v-bind:checked="operator === 'subtract'"/>➖</label>
        <label><input type="radio" v-model="operator" name="operator" value="multiply" v-bind:checked="operator === 'multiply'"/>✖</label>
        <label><input type="radio" v-model="operator" name="operator" value="divide" v-bind:checked="operator === 'divide'"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="operand2"/>

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
