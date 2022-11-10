import { defineStore } from 'pinia';
import axios from 'axios';

export const tenantStore = defineStore('tenant', {
	state: () => ({
        tenants: [],
        id: null,
        company: null,
        email: null,
        phone: null,
        address: null,
        tenant: {},
        message: null,

        //loading: false,
        validation: [],
        authenticated: false,
        url: 'http://127.0.0.1:8000/api/tenants/',
        token: localStorage.getItem('token')
    }),

    actions: {
        async fetch() {
		    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
		    axios.defaults.headers.common.Accept = 'application/json'
		    axios.defaults.headers.common['Content-Type'] = 'application/json'
            await axios
                .get(this.url)
                .then((response) => {
                    this.authenticated = true
                    this.tenants = response.data.data
                }).catch((error) => {
                    this.tenants = null
                    this.authenticated = false
                    console.log(error)
                    return error
                })
        },

        async fetchById(id) {
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
		    axios.defaults.headers.common.Accept = 'application/json'
		    axios.defaults.headers.common['Content-Type'] = 'application/json'
            await axios
                .get(this.url + id)
                .then((response) => {
                    this.authenticated = true
                    this.tenant = response.data.data
                }).catch((error) => {
                    this.tenant = null
                    console.log(error)
                    return error
                })
        },

        addItem() {
		    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
		    axios.defaults.headers.common.Accept = 'application/json'
		    axios.defaults.headers.common['Content-Type'] = 'application/json'
            
            let payload = {
                company: this.company,
                email: this.email,
                phone: this.phone,
                address: this.address
            }

            axios
                .post(this.url, payload)
                .then(() => {
                    this.formReset()
                    this.message = "Data berhasil disimpan"
                    this.router.push({name: 'tenant'})
                }).catch((error) => {
                    this.validation = error.response.data.errors
                })
        },

        editItem(id) {
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
		    axios.defaults.headers.common.Accept = 'application/json'
		    axios.defaults.headers.common['Content-Type'] = 'application/json'
            
            let payload = {
                company: this.tenant.company,
                email: this.tenant.email,
                phone: this.tenant.phone,
                address: this.tenant.address
            }

            axios
                .put(this.url + id, payload)
                .then(() => {
                    this.formReset()
                    this.message = "Data berhasil diubah"
                    this.router.push({name: 'tenant'})
                }).catch((error) => {
                    this.validation = error.response.data.errors
                })
        },

        deleteItem(id) {
            if (confirm("Do you really want to delete?")) {
                axios
                .delete(this.url + id)
                .then(() => {   
                    this.message = "Data berhasil dihapus";   
                    let index = this.tenants.map(data => data.id).indexOf(id)
                    this.tenants.splice(index, 1)
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        },

        formReset() {
            this.id = null
            this.company = null
            this.email = null
            this.phone = null
            this.address = null
            this.validation = []
        }
    }
});