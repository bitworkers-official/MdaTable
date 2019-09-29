<template>
  <div class="wrapper">
    <div role="region" aria-live="polite" class="screenreader-only">
      {{ show ? 'syncing' : 'done' }}
    </div>
    <div v-show="show" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  show: boolean
  showTimeout: number | null
}
export default Vue.extend({
  name: 'LoadingSpinner',
  props: {
    spinning: {
      type: Boolean,
      required: true,
    },
  },
  data(): Data {
    return {
      show: false,
      showTimeout: null,
    }
  },
  watch: {
    spinning: {
      handler(value) {
        if (value) {
          if (this.showTimeout) {
            clearTimeout(this.showTimeout)
          }
          this.showTimeout = setTimeout(() => {
            this.show = true
          }, 140)
        } else {
          if (this.showTimeout !== null) {
            clearTimeout(this.showTimeout)
            this.showTimeout = setTimeout(() => {
              this.show = false
            }, 200)
          }
        }
      },
      immediate: true,
    },
  },
})
</script>

<style scoped>
.wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}
.spinner {
  width: 40px;
  height: 40px;
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #42b983;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
