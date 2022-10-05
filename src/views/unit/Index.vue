<template>
    <Navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Unit</h4>
                        <router-link :to="{name: 'unit.create'}" class="btn btn-md btn-success">
                            Add Unit
                        </router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Unit</th>
                                    <th scope="col">Lantai</th>
                                    <th scope="col">Area</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="unit in units" :key="unit.id">
                                    <td>{{ unit.unit_name }}</td>
                                    <td>{{ unit.floor }}</td>
                                    <td>{{ unit.area }}</td>
                                    <td>
                                        <router-link :to="{name: 'unit.edit', params:{id: unit.id }}" class="btn btn-outline-warning mr-1">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="handleDelete(unit.id)"
                                            class="btn btn-outline-danger ml-1">
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
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

export default {
    components: {Navbar},
    setup() {
        const token = localStorage.getItem('token')

        const router = useRouter()

        //reactive state
        let units = ref([])

        //mounted
        onMounted(() => {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/units')
            .then(response => {
              
              //assign state posts with response data
              units.value = response.data

            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function handleDelete(id) {
            if (confirm("Do you really want to delete?")) {
                axios.delete(`http://localhost:8000/api/units/${id}`)
                .then(() => {      
                    let index = units.value.map(data => data.id).indexOf(id)
                    units.value.splice(index, 1)
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            }
        }

        //return
        return { units, handleDelete }

    }

}
</script>