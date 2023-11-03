import { z } from "zod";

export const VoyageHistorySchema = z.object({
	id: z.string(),
	voyageNumber: z.string(),
	departure: z.string(),
	destination: z.string(),
	etd: z.date(),
	calculatedEtd: z.date(),
});

export type VoyageHistory = z.infer<typeof VoyageHistorySchema>;
