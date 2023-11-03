import { ReportMessageDetailsSchema } from "./reportDetails";
import { ReportMessageSchema } from "./reportMessage";
import { z } from 'zod';

const AxiosResponseInterface = z.object({
	status: z.any(),
	statusText: z.any(),
	headers: z.any(),
	config: z.any(),
	request: z.any()
});

// ARRAY of MESSAGES
const dataMessages = z.object({
	messages: z.array(ReportMessageSchema),
});
export const MessagesApiResponseSchema = AxiosResponseInterface.merge(dataMessages);
export type MessagesApiResponse = z.infer<typeof MessagesApiResponseSchema>;

// SINGLE MESSAGE
export const MessageApiResponseSchema = AxiosResponseInterface.merge(ReportMessageDetailsSchema);
export type MessageApiResponse = z.infer<typeof MessageApiResponseSchema>;

