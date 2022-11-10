<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add Unit</h4>
                        <hr>

                        <form @submit.prevent="addItem">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Nama Unit</label>
                                <input 
                                    type="text" class="form-control" 
                                    v-model="unit_name" 
                                    placeholder="contoh: Unit A"
                                />
                                <!-- validation -->
                                <div v-if="validation.unit_name" class="mt-2 alert alert-danger">
                                    {{ validation.unit_name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="floor" class="font-weight-bold">Lantai</label>
                                <input type="number" class="form-control" v-model="floor">
                                <!-- validation -->
                                <div v-if="validation.floor" class="mt-2 alert alert-danger">
                                    {{ validation.floor[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="area" class="font-weight-bold">Area</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    v-model="area" 
                                    placeholder="contoh: 200m2"
                                />
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
    import { storeToRefs } from 'pinia'
    import { unitStore } from '@/store/unit'
    
    const { unit_name, floor, area, validation } = storeToRefs(unitStore())
    
    const { addItem } = unitStore()

</script>