<template>
    <Navbar />
    <div class="d-flex align-items-center justify-content-center">
        <span class="mt-4 h3"> 
            Hello {{ user.name }}!
            Selamat datang di aplikasi Nusantara Tower 
        </span>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { useAuth } from '@/store/auth'

export default {
    components: {Navbar},
    setup() {
        let user = useAuth().user
        return {user}
    }
}
</script>