import RequestService from "~/services/RequestService";
import {FORGET_PASSWORD_URL} from "~/utils/api";

export default defineEventHandler(async (event) => {
	const configs = {};
	const body = await readBody(event)

	return await (new RequestService()).post(FORGET_PASSWORD_URL, body, configs);
})
