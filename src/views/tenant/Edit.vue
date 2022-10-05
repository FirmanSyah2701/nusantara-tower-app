<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Tenant</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="company" class="font-weight-bold">Perusahaan</label>
                                <input type="text" class="form-control" v-model="tenant.company">
                                <!-- validation -->
                                <div v-if="validation.company" class="mt-2 alert alert-danger">
                                    {{ validation.company[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="tenant.email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="font-weight-bold">Nomer telpon</label>
                                <input type="text" class="form-control" v-model="tenant.phone">
                                <!-- validation -->
                                <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                    {{ validation.phone[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address" class="font-weight-bold">Alamat</label>
                                <textphone class="form-control" v-model="tenant.address"> {{tenant.address ?? ''}} </textphone>
                                <!-- validation -->
                                <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                    {{ validation.phone[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <button type="submit" class="btn btn-primary">Simpan</button>
                                <router-link :to="{name: 'tenant'}" class="btn btn-danger">Kembali</router-link>
                            </div>
                        </form>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {
        const token = localStorage.getItem('token')

        //state tenants
        const tenant = reactive({
            company: '',
            email: '',
            phone: '',
            address: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {
            console.log(token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/tenants/${route.params.id}`)
            .then(response => {
              //assign state tenants with response data
              tenant.company = response.data.company  
              tenant.email  = response.data.email
              tenant.phone  = response.data.phone  
              tenant.address = response.data.address

            }).catch(error => {
                console.log(error)
            })

        })

        //method update
        function update() {

            let company = tenant.company
            let email = tenant.email
            let phone = tenant.phone
            let address = tenant.address
            console.log(phone)

            axios.put(`http://localhost:8000/api/tenants/${route.params.id}`, {
                company: company,
                email: email,
                phone: phone,
                address: address
            }, 
            {
                headers: {'Accept': 'application/json'}
            }
            ).then(() => {

                //redirect ke tenant index
                router.push({
                    name: 'tenant'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error
            })
        }

        //return
        return {
            tenant,
            validation,
            router,
            update
        }

    }
}
</script>