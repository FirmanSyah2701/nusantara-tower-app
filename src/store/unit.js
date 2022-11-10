import { defineStore } from 'pinia';
import axios from 'axios';

export const unitStore = defineStore('unit', {
	state: () => ({
        units: [],
        id: null,
        unit_name: null,
        floor: null,
        area: null,
        unit: {},
        message: null,

        //loading: false,
        validation: [],
        authenticated: false,
        url: 'http://127.0.0.1:8000/api/units/',
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
                    this.units = response.data.data
                }).catch((error) => {
                    this.units = null
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
                    this.unit = response.data.data
                }).catch((error) => {
                    this.unit = null
                    console.log(error)
                    return error
                })
        },

        addItem() {
		    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
		    axios.defaults.headers.common.Accept = 'application/json'
		    axios.defaults.headers.common['Content-Type'] = 'application/json'
            
            let payload = {
                unit_name: this.unit_name,
                floor: this.floor,
                area: this.area
            }

            axios
                .post(this.url, payload)
                .then(() => {
                    this.formReset()
                    this.message = "Data berhasil disimpan"
                    this.router.push({name: 'unit'})
                }).catch((error) => {
                    this.validation = error.response.data.errors
                })
        },

        editItem(id) {
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
		    axios.defaults.headers.common.Accept = 'application/json'
		    axios.defaults.headers.common['Content-Type'] = 'application/json'
            
            let payload = {
                unit_name: this.unit.unit_name,
                floor: this.unit.floor,
                area: this.unit.area
            }

            axios
                .put(this.url + id, payload)
                .then(() => {
                    this.formReset()
                    this.message = "Data berhasil diubah"
                    this.router.push({name: 'unit'})
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
                    let index = this.units.map(data => data.id).indexOf(id)
                    this.units.splice(index, 1)
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        },

        formReset() {
            this.id = null
            this.unit_name = null
            this.floor = null
            this.area = null
            this.validation = []
        }
    }
});