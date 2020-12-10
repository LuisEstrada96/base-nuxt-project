require('dotenv').config()

module.exports = {
    env: {
        apiUrl : process.env.API_URL || 'cannotread',
        apiKey: process.env.API_KEY || 'cantread',
	},
    ssr: false,

    telemetry: false,

    loadingIndicator: {
        name: 'cube-grid',
        background: 'white'
    },

    head: {
        title: 'naha-clinician-web',
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
        ],
        link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
    ],

    plugins: [
        { src: '~/plugins/axios', ssr: false },
		{ src: '~/plugins/utils', ssr: false }
    ],

    components: true,

    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        'nuxt-i18n',
        '@nuxtjs/style-resources'
    ],

    styleResources: { scss: [ 'assets/scss/*.scss' ] },

    axios: {
        baseURL : process.env.apiUrl
    },

    apikey: process.env.apiKey,

	auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: 'login', method: 'post', propertyName: 'jwt' },
					user: { url: 'me', method: 'get', propertyName: false },
					logout: false
				},
				tokenRequired: true,
				tokenType: '',
				tokenName: 'token'
			},
		}
	},
    
    //router: { middleware: 'auth' },

    i18n: {
        locales: [
            { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
            { code: 'en', iso: 'en-US', file: 'en.js' },
            { code: 'es', iso: 'es-ES', file: 'es.js' }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en'
    },

    server : { port : 9041 },

    build : { extend (config, ctx) { config.node = { fs: "empty" } } }
    
}
