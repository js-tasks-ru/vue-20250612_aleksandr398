import { computed, defineComponent, ref, watch } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const emailsArray = ref([]);
    emails.forEach((email) => {
      emailsArray.value.push({
        email: email,
        marked: false
      })
    })

    const emailTemplate = ref("");

    watch((emailTemplate), () => {
      for (let i = 0; i < emailsArray.value.length; i ++) {
        emailsArray.value[i].marked = emailsArray.value[i].email.indexOf(emailTemplate.value) != -1;
      }
    })

    return {
      emailTemplate,
      emailsArray
    }

  },

  template: `
    <div>
      <div class="form-group">
        <input type="search" aria-label="Search" v-model="emailTemplate"/>
      </div>
      <ul aria-label="Emails">
        <template v-for="email in emailsArray">
          <li :class="email.marked && 'marked'">
            {{ email.email }}
          </li>
        </template>
      </ul>
    </div>
  `,
})
