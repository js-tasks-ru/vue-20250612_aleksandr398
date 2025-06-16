import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
	function compareByDt(a, b) {
		const aTimeStamp = toDateTime(a).getMilliseconds();
		const bTimeStamp = toDateTime(b).getMilliseconds();
		return aTimeStamp - bTimeStamp;
	}

    const weatherData = getWeatherData().sort((a, b) => compareByDt(a.dt, b.dt));
	const weatherConditionsIcons = WeatherConditionIcons;

    function fromKelvinToCelsius(tempInKelvin) {
        return (tempInKelvin - 273.15).toFixed(1);
    }

    function pressureFromMpaToMmHg(pressureInMpa) {
        return Math.round(pressureInMpa * 0.75)
    }

	function toDateTime(timeStr) {
		return new Date("2025-06-17 " + timeStr + ":00");
	}

	function isNightByTime(weatherInRegion) {
		const currentTime = toDateTime(weatherInRegion.current.dt);
		const sunsetTime = toDateTime(weatherInRegion.current.sunset);
		const sunriseTime = toDateTime(weatherInRegion.current.sunrise);

		return (sunsetTime > currentTime && currentTime < sunriseTime);
	}

    return {
      weatherData,
      fromKelvinToCelsius,
	  pressureFromMpaToMmHg,
	  weatherConditionsIcons,
	  isNightByTime,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherInRegion in weatherData" :class="(isNightByTime(weatherInRegion) && 'weather-card weather-card--night') || 'weather-card'">
          <div v-if="weatherInRegion.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherInRegion.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherInRegion.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherInRegion.current.weather.description">{{ weatherConditionsIcons[weatherInRegion.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ fromKelvinToCelsius(weatherInRegion.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressureFromMpaToMmHg(weatherInRegion.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherInRegion.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherInRegion.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherInRegion.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
