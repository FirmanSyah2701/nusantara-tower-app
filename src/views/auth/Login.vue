<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="login-form rounded shadow mt-4 p-4">
                    <form @submit.prevent="login()" class="row g-3">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="user.email" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" v-model="user.password" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useRouter } from 'vue-router';
import { reactive } from '@vue/reactivity';

export default {
    setup() {
        const router = useRouter()

        const user = reactive({
            email: '',
            password: ''
        })

        function login() {
            let email = user.email
            let password = user.password
            axios
                .post('http://127.0.0.1:8000/api/login', {
                    email,
                    password
                })
                .then((response) => {
                        localStorage.setItem('token', response.data.token)
                        return router.push({name: 'unit'})
                    
                }).catch((e)=>{
                    console.log(e);
                })
        }

        return { user, login }
    }
}
</script>