<template>
    <Navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Unit</h4>
                        <div v-if="message" class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong> {{message}} </strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <router-link :to="{name: 'unit.create'}" class="justify-content-md-end btn btn-md btn-success">
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
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <router-link class="btn btn-outline-warning" :to="{name: 'unit.edit', params:{id: unit.id }}">
                                                EDIT
                                            </router-link>
                                            <button class="btn btn-outline-danger" @click.prevent="deleteItem(unit.id)">
                                                DELETE
                                            </button>
                                        </div>
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

<script setup>
    import { storeToRefs } from 'pinia'
    import { unitStore } from '@/store/unit'
    import Navbar from '@/components/Navbar.vue'
    
    const { units, unit_name, floor, area, id, message } = storeToRefs(unitStore())
    
    const { fetch, deleteItem } = unitStore()
    
    fetch()

    console.log(unit_name)

</script>