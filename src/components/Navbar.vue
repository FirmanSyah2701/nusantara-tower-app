<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" :to="{name: 'dashboard'}">Nusantara Tower</router-link>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'unit'}">Unit</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'tenant'}">Tenant</router-link>
        </li>
      </ul>
      <form @submit.prevent="logout()" class="d-flex">
        <button class="btn btn-outline-success" type="submit">Logout</button>
      </form>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/store/auth'

const auth = useAuth()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  return router.push({name: 'login'})
}

</script>