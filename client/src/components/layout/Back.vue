<template>
  <div class="back-container">
    <router-link to="/">
      <img src="/logo.svg" class="logo" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.back-container {
  position: absolute;
  top: 5;
  left: 0;
}

.logo {
  width: 100px;
}
</style>