import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'
import { meetupFixture } from '@shgk/vue-course-ui';

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const choosedMeetup = ref(1);
    const meetup = ref({})

    getMeetup(parseInt(choosedMeetup.value)).then((value) => meetup.value = value);

    function nextPrevMeetup(value) {
      console.log(value, choosedMeetup.value);
      choosedMeetup.value = parseInt(choosedMeetup.value)
      choosedMeetup.value += parseInt(value);
      if (choosedMeetup.value <= 0) {
        choosedMeetup.value = 1;
      }
      if (choosedMeetup.value >= 5) {
        choosedMeetup.value = 5
      }

      getMeetup(choosedMeetup.value)
    }

    watch((choosedMeetup), () => {
      choosedMeetup.value = parseInt(choosedMeetup.value)
      getMeetup(parseInt(choosedMeetup.value)).then((value) => meetup.value = value);
      console.log(meetup.value);
    })

    return {
      choosedMeetup,
      nextPrevMeetup,
      meetup
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" @click="nextPrevMeetup(-1)" :disabled="choosedMeetup === 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="choosedMeetup"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="choosedMeetup"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="choosedMeetup"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="choosedMeetup"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="choosedMeetup"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" @click="nextPrevMeetup(1)" :disabled="choosedMeetup === 5">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover" :src="meetup.image">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
