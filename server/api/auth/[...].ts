import CredentialsProvider from "next-auth/providers/credentials";
import {NuxtAuthHandler} from "#auth";
import RequestService from "~/services/RequestService";

const config = useRuntimeConfig()

export default NuxtAuthHandler({
	secret: 'my-superb-secret',
	pages: {
		signIn: '/ar/login',
	},
	providers: [
		// @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
		CredentialsProvider.default({
			name: "Credentials",
			credentials: {},  // Object is required but can be left empty.
			async authorize(credentials: any) {
				const requestService = new RequestService()

				const response = await requestService.post('auth/login', credentials)

				if (response?.response.data) {
					return response.response.data
				}
				return null
			},
		}),
	],
	callbacks: {
		jwt: ({token, account, user}) => {
			if (account && user) {
				token.accessToken = account.access_token
				token.user = user
			}
			return token
		},
		session: ({token, session}: any) => {
			if (token) {
				session['user'] = token['user']
				session['accessToken'] = session['user'].access_token
			}
			return session
		},
	},
});
