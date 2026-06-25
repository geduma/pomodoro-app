<template>
  <div class="row">
    <div class="col-md-12 timer-container text-center pt-2">
      <button type="button" class="mode g-btn" v-on:click="changeMode">{{ mode }}</button>
      <hr />
      <div class="col-md-12 text-center">
        <span v-bind:class="{ 'paused': !flag || pause_flag }" class="time">
          {{ (min.toString().length == 1) ? '0' + min : min }}:{{ (sec.toString().length == 1) ? '0' + sec : sec }}
        </span>
      </div>
      <div class="col-md-12 mb-4 buttons">
        <button v-if="!flag || pause_flag" type="button" class="btn btn-primary timer" v-on:click="start">START</button>
        <button v-if="flag && !pause_flag" type="button" class="btn btn-info timer" v-on:click="pause">PAUSE</button>
        <button v-if="flag" type="button" class="btn btn-danger timer" v-on:click="stop">STOP</button>
        <button v-if="audio_flag" type="button" class="btn btn-danger timer" v-on:click="mute">
          <img src="@public/icons/player-stop.svg" alt="stop" />
        </button>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
<script lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import settings from '../../public/settings.json'
import FooterComponent from './FooterComponent.vue'

export default {
  name: 'HomeComponent',
  setup() {
    let pom = 0
    let short = 0
    let long = 0
    // let longInterval = 0
    let alarmType = ''

    const min = ref(pom)
    const sec = ref(0)
    const flag = ref(false)
    const audio_flag = ref(false)
    const pause_flag = ref(false)
    const modes = ['Pomodoro', 'Short Break', 'Long Break']
    const mode = ref(modes[0])

    let mil: number = 0
    let mil_state: number = 0
    let interval: any
    let timeout: any
    let snd: HTMLMediaElement

    const start = () => {
      click()
      if (snd != undefined) mute()
      if (!pause_flag.value) mil = min.value * 60000 //if not paused -> initial

      flag.value = true
      pause_flag.value = false
      interval = setInterval(() => {
        min.value = (sec.value == 0) ? --min.value : min.value
        sec.value = (sec.value == 0) ? 59 : --sec.value
        mil_state++
      }, 1000)

      timeout = setTimeout(() => {
        stop()
        play()
        // changeMode()
      }, mil)
    }

    const stop = () => {
      click()
      if (snd != undefined) mute()

      pause_flag.value = false
      flag.value = false
      min.value = (mode.value == modes[0]) ? pom : (mode.value == modes[1]) ? short : long
      sec.value = 0
      mil = 0
      mil_state = 0

      clearInterval(interval)
      clearTimeout(timeout)
    }

    const pause = () => {
      click()
      pause_flag.value = true
      mil = mil - (mil_state * 1000)
      mil_state = 0

      clearInterval(interval)
      clearTimeout(timeout)
    }

    const play = () => {
      audio_flag.value = true
      snd = new Audio(`./audio/alarm_${alarmType}.mp3`)
      snd.play()

      setTimeout(() => {
        audio_flag.value = false
        snd.pause()
      }, 30000)
    }

    const mute = () => {
      click()
      audio_flag.value = false
      snd.pause()
    }

    const click = () => {
      new Audio('./audio/click.wav').play()
    }

    const changeMode = () => {
      let idx = modes.indexOf(mode.value)
      idx = (idx == (modes.length - 1)) ? 0 : idx + 1
      mode.value = modes[idx]
      stop()
    }

    onMounted(() => {
      const { pomodoro, shortBreak, longBreak, alarm } = (localStorage.getItem('pomodoro-app-settings') != null)
        ? JSON.parse(localStorage.getItem('pomodoro-app-settings') ?? '')
        : settings

      pom = min.value = pomodoro
      short = shortBreak
      long = longBreak
      alarmType = Array.isArray(alarm) ? alarm[0] : alarm
    })

    onUnmounted(() => {
      clearInterval(interval)
      clearTimeout(timeout)
    })

    return {
      min,
      sec,
      flag,
      audio_flag,
      pause_flag,
      mode,
      settings,
      start,
      stop,
      pause,
      mute,
      changeMode
    }
  },
  components: {
    FooterComponent
  }
}
</script>
<style scoped>
.row {
  padding: 0 1rem;
}

.timer-container {
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.time {
  font-size: 60px;
  cursor: default;
}

button.timer {
  font-size: 15px;
}

button.mode {
  color: var(--default-color);
  background-color: transparent;
  border: none;
  font-size: 20px;
  opacity: .8;
}

button.mode:hover {
  opacity: .6;
}

.paused {
  opacity: .3;
}

hr {
  margin: 2px 20px;
}

img{
  height: 25px;
}
</style>
