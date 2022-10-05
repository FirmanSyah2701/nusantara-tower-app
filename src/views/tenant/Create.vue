<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add Tenant</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="company" class="font-weight-bold">Perusahaan</label>
                                <input type="text" class="form-control" v-model="tenant.company" placeholder="contoh: PT Ayo Maju">
                                <!-- validation -->
                                <div v-if="validation.unit_name" class="mt-2 alert alert-danger">
                                    {{ validation.unit_name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="tenant.email" placeholder="contoh: ayomaju1@gmail.com">
                                <!-- validation -->
                                <div v-if="validation.floor" class="mt-2 alert alert-danger">
                                    {{ validation.floor[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="font-weight-bold">Nomer telpon</label>
                                <input type="text" class="form-control" v-model="tenant.phone" placeholder="contoh: 8399913212">
                                <!-- validation -->
                                <div v-if="validation.area" class="mt-2 alert alert-danger">
                                    {{ validation.area[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address" class="font-weight-bold">Alamat</label>
                                <textarea class="form-control" v-model="tenant.address"></textarea>
                                <!-- validation -->
                                <div v-if="validation.area" class="mt-2 alert alert-danger">
                                    {{ validation.area[0] }}
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {
        //const token = localStorage.getItem('token')

        //state posts
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

        //method store
        function store() {

            let company = tenant.company
            let email = tenant.email
            let phone = tenant.phone
            let address = tenant.address

            //axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('http://localhost:8000/api/tenants', {
                company: company,
                email: email,
                phone: phone,
                address: address
            },
            {
                headers: {'Accept': 'application/json', 'content-type': 'application/json'}
            }
            ).then(() => {
                //redirect ke tenant index
                router.push({
                    name: 'tenant'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            tenant,
            validation,
            router,
            store
        }

    }

}
</script>