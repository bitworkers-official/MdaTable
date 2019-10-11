<template>
  <a-list-box class="relative ">
    <a-list-box-button class="whitespace-no-wrap flex font-bold outline-none">
      {{ text }}{{ active ? '*' : ''
      }}<icon-angle-down class="h-3 ml-1" style="margin-top:0.45rem" />
    </a-list-box-button>
    <a-list-box-options
      :options="['Show All', ...options]"
      :activeIndex.sync="activeIndex"
      @selectOption="selectOption"
      class="text-black absolute bg-white z-10 w-40 left-0  shadow-lg outline-none"
    >
      >
      <template v-slot:default="{ option }">
        <span
          class="whitespace-no-wrap select-none cursor-pointer hover:bg-gray-200 flex p-2 pl-6"
        >
          {{ option }}
        </span>
      </template>
    </a-list-box-options>
  </a-list-box>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  AListBox,
  AListBoxOptions,
  AListBoxButton,
} from '@simon-siefke/vue-a11y-components'
import IconAngleDown from './Icons/IconAngleDown.vue'
import * as api from '../api/api'

export default Vue.extend({
  components: {
    AListBox,
    AListBoxOptions,
    AListBoxButton,
    IconAngleDown,
  },
  model: {
    prop: 'filter',
    event: 'filter',
  },
  props: {
    filter: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    filterKey: {
      type: String,
      required: true,
    },
    persons: {
      type: Array,
      required: true,
    },
    setFilter: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    options(): string[] {
      // @ts-ignore
      return this.persons.map(person => person[this.filterKey])
    },
    active(): boolean {
      return (
        this.filter[this.filterKey] !== undefined &&
        this.filter[this.filterKey] !== 'Show All'
      )
    },
  },
  watch: {
    filter(value) {
      if (Object.keys(value).length >= 1 && !value[this.filterKey]) {
        this.activeIndex = 0
      }
    },
  },
  methods: {
    selectOption(option: string) {
      if (option === 'Show All') {
        this.setFilter({})
      } else {
        this.setFilter({
          [this.filterKey]: option,
        })
      }
    },
  },
})
</script>

<style>
li[aria-selected='true'] span::before {
  content: ' ✔️';
  left: 0.4rem;
  @apply absolute
  /* @apply mr-1; */;
}
li[aria-selected='true'] {
  @apply bg-gray-200;
}
</style>
