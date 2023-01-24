import RequestService from "~/services/RequestService";
import {VERIFY_PASSWORD_TOKEN_URL} from "~/utils/api";

export default defineEventHandler(async (event) => {
	const configs = {};
	const body = await readBody(event)

	return await (new RequestService()).post(VERIFY_PASSWORD_TOKEN_URL, body, configs);
})
