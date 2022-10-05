<template>
    <Navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Tenant</h4>
                        <router-link :to="{name: 'tenant.create'}" class="btn btn-md btn-success">
                            Add Tenant
                        </router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Perusahaan</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nomer Telpon</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tenant in tenants" :key="tenant.id">
                                    <td>{{ tenant.company }}</td>
                                    <td>{{ tenant.email }}</td>
                                    <td>{{ tenant.phone }}</td>
                                    <td>{{ tenant.address }}</td>
                                    <td>
                                        <router-link :to="{name: 'tenant.edit', params:{id: tenant.id }}" class="btn btn-outline-warning">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="handleDelete(tenant.id)"
                                            class="btn btn-outline-danger pl-4">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

export default {
    components: {Navbar},
    setup() {
        const token = localStorage.getItem('token')

        //reactive state
        let tenants = ref([])

        //mounted
        onMounted(() => {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/tenants')
            .then(response => {
              //assign state posts with response data
              tenants.value = response.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        function handleDelete(id) {
            if (confirm("Do you really want to delete?")) {
            //delete data post by ID
                axios.delete(`http://localhost:8000/api/tenants/${id}`)
                .then(() => {      
                    //splice tenants 
                    //tenants.value.splice(tenants.value.indexOf(id), 1);
                    let index = tenants.value.map(data => data.id).indexOf(id)
                    tenants.value.splice(index, 1)

                    }).catch(error => {
                        console.log(error.response.data)
                    })
            }
        }

        return { tenants, handleDelete }

    }

}
</script>