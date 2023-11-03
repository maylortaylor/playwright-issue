import { ReportMessageStatus } from '../enums/reportMessageStatus';
import { VesselPositionSchema } from '../common/vesselPosition';
import { z } from 'zod';

export const ReportMessageSchema = z.object({
	messageId: z.string(),
	dateReceived: z.string(),
	reportType: z.string(),
	status: z.nativeEnum(ReportMessageStatus),
	keywords: z.string().array().nullable(),
	position: VesselPositionSchema.nullable(),
	vesselName: z.string().nullable(),
	imoNumber: z.string().nullable(),
	callSign: z.string().nullable(),
	attention: z.string().nullable()
})
// .transform((val) => ({ ...val, statusMessage: transformStatus(val.status) }));

function transformStatus(status) {
	switch (status) {
		case 0:
			return 'UNKNOWN'
		case 1:
			return 'UNREAD';
		case 2:
			return 'OK';
		case 3:
			return 'INTERVENTION_REQUIRED';
		case 4:
			return 'INTERVENTION_FAILED';
		case 5:
			return 'ALERT';
		case 6:
			return 'DELETED';
		default:
			return 'n/a';
	}
}

export type ReportMessage = z.infer<typeof ReportMessageSchema>;

