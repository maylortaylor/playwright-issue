import { VesselPositionSchema } from "../common/vesselPosition";
import { z } from "zod";

export const Last20DaysReportSchema = z.object({
	id: z.string(),
	reportType: z.string(),
	dateReceived: z.date(),
	position: VesselPositionSchema,
	speed: z.string(),
	destination: z.string(),
	country: z.string(),
});

export type Last20DaysReport = z.infer<typeof Last20DaysReportSchema>;
