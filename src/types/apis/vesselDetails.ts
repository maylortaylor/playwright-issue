import { ReportMessageStatus } from '../enums/reportMessageStatus';
import { z } from "zod";
export const VesselDetailsSchema = z.object({
	messageId: z.string(),
	name: z.string(),
	reportType: z.string(),
	auditLog: z.any().array(),
	originalMessage: z.string(),
	timestamp: z.date(),
	messageBody: z.string(),
	pasedSolution: z.string(),
	status: z.nativeEnum(ReportMessageStatus),
	parsedResults: z.string().array(),
	missingLines: z.string().array(),
	imoNumber: z.string(),
	callSign: z.string(),
});

export type VesselDetails = z.infer<typeof VesselDetailsSchema>;
