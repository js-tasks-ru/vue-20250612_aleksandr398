import '@shgk/vue-course-ui/meetups/style.css'
import { createApp } from 'vue'
import CalculatorApp from './CalculatorApp.js'
import './CalculatorApp.css'

//createApp(CalculatorApp).mount('#app')

const app = createApp(CalculatorApp)
const vm = app.mount('#app')
window.vm = vm
