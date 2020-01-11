<template>
  <div class="auth-container">
    <router-link to="/login">
      <img src="/icons/user.svg" class="icon" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.auth-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.icon {
  width: 50px;
}
</style>