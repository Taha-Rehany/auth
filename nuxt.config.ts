export default defineNuxtConfig({
	auth: {
		// The module is enabled. Change this to disable the module
		isEnabled: true,
		// The origin is set to the development origin. Change this when deploying to production
		origin: 'http://localhost:3000',
		// The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
		basePath: '/api/auth',
		// Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
		enableSessionRefreshPeriodically: false,
		// Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
		enableSessionRefreshOnWindowFocus: false,
		// Whether to add a global authentication middleware that will protect all pages without exclusion
		enableGlobalAppMiddleware: true,
	},
})
