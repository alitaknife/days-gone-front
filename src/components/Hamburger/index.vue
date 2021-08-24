<template>
  <div style="padding: 2px 18px;" @click="toggleClick">
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M643.8 221.35l57.48 57.48a45.47 45.47 0 0 1-8.76 71.17l-205.1 123c-29.43 17.66-29.43 60.3 0 78l205.1 123a45.47 45.47 0 0 1 8.76 71.13l-57.48 57.52a45.45 45.45 0 0 1-61.24 2.77l-310.2-258.5a45.45 45.45 0 0 1 0-69.84l310.2-258.5a45.45 45.45 0 0 1 61.24 2.77z" fill="#909399" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
