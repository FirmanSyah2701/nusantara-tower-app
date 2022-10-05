<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT Unit</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="unit_name" class="font-weight-bold">Nama Unit</label>
                                <input type="text" class="form-control" v-model="unit.unit_name">
                                <!-- validation -->
                                <div v-if="validation.unit_name" class="mt-2 alert alert-danger">
                                    {{ validation.unit_name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="floor" class="font-weight-bold">floor</label>
                                <input type="number" class="form-control" v-model="unit.floor">
                                <!-- validation -->
                                <div v-if="validation.floor" class="mt-2 alert alert-danger">
                                    {{ validation.floor[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="area" class="font-weight-bold">Area</label>
                                <input type="text" class="form-control" v-model="unit.area">
                                <!-- validation -->
                                <div v-if="validation.area" class="mt-2 alert alert-danger">
                                    {{ validation.area[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <button type="submit" class="btn btn-primary">Simpan</button>
                                <router-link :to="{name: 'unit'}" class="btn btn-danger">Kembali</router-link>
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

        //state units
        const unit = reactive({
            unit_name: '',
            floor: 0,
            area: ''
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
            axios.get(`http://localhost:8000/api/units/${route.params.id}`)
            .then(response => {
              //assign state units with response data
              unit.unit_name = response.data.unit_name  
              unit.floor  = response.data.floor
              unit.area  = response.data.area  

            }).catch(error => {
                console.log(error)
            })

        })

        //method update
        function update() {

            let unit_name = unit.unit_name
            let floor = unit.floor
            let area = unit.area

            axios.put(`http://localhost:8000/api/units/${route.params.id}`, {
                unit_name: unit_name,
                floor: floor,
                area: area
            },
            {
                headers: {'Accept': 'application/json', 'content-type': 'application/json'}
            }
            ).then(() => {

                //redirect ke unit index
                router.push({
                    name: 'unit'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }

        //return
        return {
            unit,
            validation,
            router,
            update
        }

    }
}
</script>