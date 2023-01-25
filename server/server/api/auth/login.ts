import { defineEventHandler, readBody } from 'h3';
import RequestService from "~/services/RequestService";
import {LOGIN_URL} from "~/utils/api";

export default defineEventHandler(async (event) => {
	const configs = {};
	const body = await readBody(event)

	return await (new RequestService()).post(LOGIN_URL, body, configs);
})
