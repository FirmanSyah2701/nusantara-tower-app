<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add Tenant</h4>
                        <hr>

                        <form @submit.prevent="addItem">
                            <div class="form-group">
                                <label for="company" class="font-weight-bold">Perusahaan</label>
                                <input type="text" class="form-control" v-model="company" placeholder="contoh: PT Ayo Maju">
                                <!-- validation -->
                                <div v-if="validation.company" class="mt-2 alert alert-danger">
                                    {{ validation.company[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="email" placeholder="contoh: ayomaju1@gmail.com">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="font-weight-bold">Nomer telpon</label>
                                <input type="text" class="form-control" v-model="phone" placeholder="contoh: 8399913212">
                                <!-- validation -->
                                <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                    {{ validation.phone[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address" class="font-weight-bold">Alamat</label>
                                <textarea class="form-control" v-model="address"></textarea>
                                <!-- validation -->
                                <div v-if="validation.address" class="mt-2 alert alert-danger">
                                    {{ validation.address[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3 d-grid gap-2 d-md-flex justify-content-md-start">
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

<script setup>
    import { storeToRefs } from 'pinia'
    import { tenantStore } from '@/store/tenant'

    const { company, email, phone, address, validation } = storeToRefs(tenantStore())
    
    const { addItem } = tenantStore()

</script>