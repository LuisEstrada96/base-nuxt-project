import { apikey } from '~/nuxt.config.js';

export default function ({ $axios, app, redirect }) {	
	$axios.onRequest(config => {
		config.headers.common['apikey'] = apikey;
	})
	$axios.onError(error => {
		if (error.response.status === 401) {
			app.$auth.logout();
			redirect('/login');
		}
	})
}
