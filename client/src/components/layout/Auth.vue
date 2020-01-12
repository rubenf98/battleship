<template>
  <div class="auth-container">
    <router-link v-if="!logged" to="/login">
      <img src="/icons/user.svg" class="icon" />
    </router-link>
    <div v-if="logged" @click="logout()">
      <img src="/icons/logout.svg" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["logged"],
  methods: {
    logout() {
      localStorage.removeItem("token");
      location.reload();
    }
  }
};
</script>

<style scoped>
.auth-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.icon {
  width: 50px;
  cursor: pointer;
}
</style>