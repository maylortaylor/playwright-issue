import { ReportMessageStatus } from '../enums/reportMessageStatus';
import { VesselPositionSchema } from '../common/vesselPosition';
import { z } from 'zod';

export const ReportMessageDetailsSchema = z.object({
	messageId: z.string(),
	dateReceived: z.string(),
	reportType: z.string(),
	vesselName: z.string().nullable(),
	imoNumber: z.string().nullable(),
	callSign: z.string().nullable(),
	position: VesselPositionSchema.nullable(),
	status: z.nativeEnum(ReportMessageStatus),
	attention: z.string().nullable(),
	keywords: z.string().array().nullable(),
	originalMessage: z.string().optional(),
	rawMessage: z.string().optional(),
	parsedMessage: z.string().optional(),
	parsedResults: z.string().array().optional(),
	missingLines: z.string().array().optional(),
	auditLog: z.any().array().optional(),
});

export type ReportMessageDetails = z.infer<typeof ReportMessageDetailsSchema>;
