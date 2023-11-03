import {
	MessageApiResponse,
	MessageApiResponseSchema,
	MessagesApiResponse,
	MessagesApiResponseSchema
} from "../types/apis/axiosResponse";

import http from './http-common.api';

class MessagesUtilityService {
	getAllMessages = async (): Promise<MessagesApiResponse> => {
		const params = 'issue-type=both';
		const responseData = await http.get<MessagesApiResponse>(`/messages?${params}`);
		const messages = MessagesApiResponseSchema.parse(responseData.data);
		console.log("🚀 ~ file: messageUtility.api.ts:15 ~ MessagesUtilityService ~ getMessages= ~ messages:", messages)
		return messages;
	};

	getAttentionMessages = async (): Promise<MessagesApiResponse> => {
		const params = 'issue-type=attention';
		const responseData = await http.get<MessagesApiResponse>(`/messages?${params}`);
		const messages = MessagesApiResponseSchema.parse(responseData.data);
		console.log("🚀 ~ file: messageUtility.api.ts:23 ~ MessagesUtilityService ~ getMessages= ~ messages:", messages)
		return messages;
	};

	getParsedFailedMessages = async (): Promise<MessagesApiResponse> => {
		const params = 'issue-type=parsed-failed';
		const responseData = await http.get<MessagesApiResponse>(`/messages?${params}`);
		const messages = MessagesApiResponseSchema.parse(responseData.data);
		console.log("🚀 ~ file: messageUtility.api.ts:31 ~ MessagesUtilityService ~ getMessages= ~ messages:", messages)
		return messages;
	};

	getReportDetailsData = async (id): Promise<MessageApiResponse> => {
		console.log("😇 😇 😇 😇 CALL REPORT DETAILS 😇 😇 😇 😇 ");
		const params = `message_id=${id}`;
		const responseData = await http.get<MessageApiResponse>(`/message?${params}`);
		const message = MessageApiResponseSchema.parse(responseData.data);
		console.log("🚀 ~ file: messageUtility.api.ts:40 ~ getReportDetailsData ~ message:", message)
		return message;
	};
}

export default new MessagesUtilityService();