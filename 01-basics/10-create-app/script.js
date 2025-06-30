import { defineComponent, createApp } from 'vue/dist/vue.esm-browser.js'

const App = defineComponent({
    name: "App",

    setup() {
        function getLocalDate() {
            return new Date().toLocaleString(navigator.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }
            )
        };

        return {
            getLocalDate,
        }
    },

    template: `
        <div>
            <a> Сегодня {{ getLocalDate() }}</a>
        </div>
    `,
})

const app = createApp(App)

const vm = app.mount('#app')

window.vm = vm