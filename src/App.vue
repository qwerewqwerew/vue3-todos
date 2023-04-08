<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">망고노트</router-link>
      <div class="navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link active" to="/todos">일정보기</router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>

</script>

<style>
</style>