import { z } from "zod";

export const VesselDetailsCommentSchema = z.object({
	id: z.string(),
	dateCreated: z.date(),
	createdBy: z.string(),
	commentBody: z.string(),
});

export type VesselDetailsComment = z.infer<typeof VesselDetailsCommentSchema>;
