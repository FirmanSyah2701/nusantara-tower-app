<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add Unit</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Nama Unit</label>
                                <input type="text" class="form-control" v-model="unit.unit_name" placeholder="contoh: Unit A">
                                <!-- validation -->
                                <div v-if="validation.unit_name" class="mt-2 alert alert-danger">
                                    {{ validation.unit_name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="floor" class="font-weight-bold">Lantai</label>
                                <input type="number" class="form-control" v-model="unit.floor">
                                <!-- validation -->
                                <div v-if="validation.floor" class="mt-2 alert alert-danger">
                                    {{ validation.floor[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="area" class="font-weight-bold">Area</label>
                                <input type="text" class="form-control" v-model="unit.area" placeholder="contoh: 200m2">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {
        const token = localStorage.getItem('token')

        //state posts
        const unit = reactive({
            unit_name: '',
            floor: '',
            area: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let unit_name = unit.unit_name
            let floor = unit.floor
            let area = unit.area
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('http://localhost:8000/api/units', {
                unit_name: unit_name,
                floor: floor,
                area: area
            }, 
            {
                headers: {'Accept': 'application/json', 'content-type': 'application/json'}
            }
            ).then(() => {
                //redirect ke unit index
                router.push({name: 'unit'})
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data.errors
            })

        }

        //return
        return {
            unit,
            validation,
            router,
            store
        }

    }

}
</script>