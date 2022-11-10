<template>
    <Navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Tenant</h4>
                        <div v-if="message" class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong> {{message}} </strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
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
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <router-link :to="{name: 'tenant.edit', params:{id: tenant.id }}" class="btn btn-outline-warning">
                                                EDIT
                                            </router-link>
                                            <button @click.prevent="deleteItem(tenant.id)"
                                                class="btn btn-outline-danger pl-4">
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
    import { tenantStore } from '@/store/tenant'
    import Navbar from '@/components/Navbar.vue'
    
    const { tenants, company, email, phone, address, id, message } = storeToRefs(tenantStore())
    
    const { fetch, deleteItem } = tenantStore()
    
    fetch()

</script>