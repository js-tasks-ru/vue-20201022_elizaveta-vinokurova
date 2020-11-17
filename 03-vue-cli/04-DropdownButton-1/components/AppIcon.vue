<template>
  <img class="icon" alt="icon" :src="iconSrc" />
</template>

<script>
const iconMap = {
  'alert-circle': require('../../../public/assets/icons/icon-alert-circle.svg'),
  'cal-sm': require('../../../public/assets/icons/icon-cal-sm.svg'),
  'cal-lg': require('../../../public/assets/icons/icon-cal-lg.svg'),
  check: require('../../../public/assets/icons/icon-check.svg'),
  'check-circle': require('../../../public/assets/icons/icon-check-circle.svg'),
  'chevron-down': require('../../../public/assets/icons/icon-chevron-down.svg'),
  clock: require('../../../public/assets/icons/icon-clock.svg'),
  coffee: require('../../../public/assets/icons/icon-coffee.svg'),
  key: require('../../../public/assets/icons/icon-key.svg'),
  list: require('../../../public/assets/icons/icon-list.svg'),
  map: require('../../../public/assets/icons/icon-map.svg'),
  'pen-tool': require('../../../public/assets/icons/icon-trash.svg'),
  'pill-active': require('../../../public/assets/icons/icon-pill-active.svg'),
  search: require('../../../public/assets/icons/icon-search.svg'),
  trash: require('../../../public/assets/icons/icon-trash.svg'),
  tv: require('../../../public/assets/icons/icon-tv.svg'),
  user: require('../../../public/assets/icons/icon-user.svg'),
};
export default {
  name: 'AppIcon',

  props: {
    icon: {
      type: String,
      required: true,
      validate: (name) => Object.keys(iconMap).includes(name),
    },
  },

  computed: {
    iconSrc() {
      return iconMap[this.icon];
    },
  },
};
</script>

<style scoped></style>
