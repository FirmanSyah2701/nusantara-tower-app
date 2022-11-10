<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="login-form rounded shadow mt-4 p-4">
                    <div v-if="validation" class="mt-2 alert alert-danger">
                        {{ validation.message }}
                    </div>
                    <form @submit.prevent="login()" class="row g-3">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="user.email" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" v-model="user.password" placeholder="Password">                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../store/auth'

const router = useRouter()
const store = useAuth()

const user = reactive({
	email: '',
	password: '',
})

const validation = ref(null)

const login = async () => {
    await store.login(user)
    validation.value = store.error
    router.replace({name: 'dashboard'})
}
</script>