<template>
  <div class="toasts">
    <template v-for="toast in toasts">
      <!--            <div class="toast toast_success"-->
      <!--                 v-if="toast.type === 'success'"-->
      <!--                 :key="toast.id"-->
      <!--            >-->
      <!--                <app-icon icon="check-circle"/>-->
      <!--                <span>{{ toast.message }}</span>-->
      <!--            </div>-->
      <!--            <div class="toast toast_error"-->
      <!--                 v-if="toast.type === 'error'"-->
      <!--                 :key="toast.id"-->
      <!--            >-->
      <!--                <app-icon icon="alert-circle"/>-->
      <!--                <span>{{ toast.message }}</span>-->
      <!--            </div>-->


      <div class="toast"
           :class="`toast_${toast.type}`"
           :key="toast.id"
      >
        <app-icon :icon="toast.icon"/>
        <span>{{ toast.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: {AppIcon},

  data() {
    return {
      toasts: [],
      key: 0,
    }
  },

  methods: {
    error(message) {
      this.toasts.push({
        type: 'error',
        id: this.key,
        icon: 'alert-circle',
        message: message,
      });
      this.handleToast();
    },

    success(message) {
      this.toasts.push({
        type: 'success',
        id: this.key,
        icon: 'check-circle',
        message: message,
      });
      this.handleToast();
    },

    handleToast() {
      this.key++;
      setTimeout(() => {
        this.toasts.shift();
      }, DELAY);
    }
  },

  watch: {
    toasts() {
      if (this.toasts.length === 0) {
        this.key = 0;
      }
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
