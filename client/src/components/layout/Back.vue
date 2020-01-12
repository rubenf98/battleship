<template>
  <div class="back-container">
    <router-link to="/">
      <img src="/icons/back.svg" class="logo" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.back-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.logo {
  width: 50px;
}
</style>