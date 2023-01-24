import RequestService from "~/services/RequestService";
import {LOGOUT_URL} from "~/utils/api";

export default defineEventHandler(async (event) => {
	const configs = {};
	const body = await readBody(event)

	return (await (new RequestService()).authorize(event)).post(LOGOUT_URL, configs);
})
