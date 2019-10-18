<template>
  <td>
    <button
      @click.prevent="share"
      aria-label="share row"
      title="share"
      class="p-2"
    >
      <icon-share width="0.9rem" />
    </button>
  </td>
</template>

<script>
import IconShare from './Icons/IconShare.vue'

export default {
  components: {
    IconShare,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  methods: {
    share() {
      console.log('share')
    },
  },
}
</script>
