import { defineComponent, ref, watch, watchEffect, computed } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    const x = ref(0)
    const y = ref(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
      console.log("handeClick", x, y)
	    /*const map = document.querySelector('.pin')
		  map.style.left = `${x}px`
		  map.style.top = `${y}px`*/
    }
	
	/*computed(() => {
		const map = document.querySelector('.pin')
		map.style.left = `${x}px`
		map.style.top = `${y}px`  
	})*/
    // Следим за X и Y для установки нового положения
    watch([x, y], ([x, y]) => {
      console.log("watch", x, y)
      // Находим метку и изменяем её положение
      const map = document.querySelector('.pin')
      map.style.left = `${x.value}px`
      map.style.top = `${y.value}px`
    })

    return {
      handleClick,
      x,
      y
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="{ 'left': x + 'px', 'top': y + 'px' }">📍</span>
    </div>
  `,
})
