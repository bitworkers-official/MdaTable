<template>
  <div>
    <slot />
  </div>
</template>

<script>
// @ts-nocheck
export default {
  data() {
    return {
      visible: false,
      buttonId: `button-${`${Math.random()}`.slice(2, 10)}`,
      listId: `list-${`${Math.random()}`.slice(2, 10)}`,
    }
  },
  provide() {
    return {
      listBox: {
        listId: this.listId,
        buttonId: this.buttonId,
      },
    }
  },
  mounted() {
    const $listBoxButton = document.getElementById(this.buttonId)
    const $listBoxList = document.getElementById(this.listId)
    const show = () => {
      $listBoxList.style.display = 'block'
      $listBoxButton.setAttribute('aria-expanded', 'true')
      $listBoxList.focus()
    }
    const hide = () => {
      $listBoxButton.removeAttribute('aria-expanded')
      $listBoxList.style.display = 'none'
      $listBoxButton.focus()
    }
    const toggleVisible = () => {
      if ($listBoxList.style.display === 'block') {
        hide()
      } else {
        show()
      }
    }
    const hideOnBlur = event => {
      if (!$listBoxButton.contains(event.relatedTarget)) {
        hide()
      }
    }
    $listBoxButton.addEventListener('click', toggleVisible)
    $listBoxList.addEventListener('blur', hideOnBlur)
    const hideOnEscape = event => {
      if (['Escape', 'Enter', 'Return'].includes(event.key)) {
        event.preventDefault()
        hide()
      }
    }
    $listBoxList.addEventListener('keydown', hideOnEscape)
    $listBoxList.addEventListener('click', hide)
    this.$once('hook:beforeDestroy', () => {
      $listBoxButton.removeEventListener('click', toggleVisible)
      $listBoxList.removeEventListener('blur', hideOnBlur)
      $listBoxList.removeEventListener('keydown', hideOnEscape)
      $listBoxList.removeEventListener('click', hide)
    })
  },
}
</script>
