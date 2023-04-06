<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      망고의 스케줄 관리앱
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }">
          Todos
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>