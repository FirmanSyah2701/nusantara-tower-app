import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuth = defineStore('auth-store', () => {
	const user = ref(null);
	const authenticated = ref(false);
	const apiUrl = 'http://127.0.0.1:8000/api'
	const error = null;

	const login = async function (credentials) {
		axios.defaults.headers.common.Accept = 'application/json';
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		await axios
			.post(`${apiUrl}/login`, credentials)
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				getUser();
			}).catch((error) => {
				user.value = null;
				authenticated.value = false;
				this.error = error.response.data;
				return this.error;
			})
	};

	const logout = async function () {
		try {
			await axios.post(`${apiUrl}/logout`);
			user.value = null;
			authenticated.value = false;
		} catch (err) {
			console.error('Error loading new arrivals:', err);
			return err;
		}
	};

	const getUser = async function () {
		let token = localStorage.getItem('token');
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		axios.defaults.headers.common.Accept = 'application/json';
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		await axios
			.get(`${apiUrl}/user`)
			.then((response) => {
				authenticated.value = true;
				user.value = response.data;
			}).catch((error) => {
				user.value = null;
				authenticated.value = false;
				console.log(error);
				return error
			})
	}; 

	return {
		user,
		login,
		getUser,
		logout,
		authenticated,
		error,
	};
});