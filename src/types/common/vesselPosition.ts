import { z } from "zod";

// export const VesselPositionSchema = z.tuple([
// 	z.number(),
// 	z.number()
// ]);

export const VesselPositionSchema = z.object({
	latitude: z.number(),
	longitude: z.number()
});
