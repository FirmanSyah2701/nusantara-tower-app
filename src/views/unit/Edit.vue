<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT Unit</h4>
                        <hr>

                        <form @submit.prevent="editItem(unit.id)">
                            <div class="form-group">
                                <label for="unit_name" class="font-weight-bold">Nama Unit</label>
                                <input type="text" class="form-control" v-model="unit.unit_name">
                                <!-- validation -->
                                <div v-if="validation.unit_name" class="mt-2 alert alert-danger">
                                    {{ validation.unit_name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="floor" class="font-weight-bold">Floor</label>
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
                            <div class="form-group mt-3 d-grid gap-2 d-md-flex justify-content-md-start">
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

<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { unitStore } from '../../store/unit' 

const { unit, unit_name, floor, area, id, validation } = storeToRefs(unitStore())
    
const { fetchById, editItem } = unitStore()

const route = useRoute()
fetchById(route.params.id)

</script>