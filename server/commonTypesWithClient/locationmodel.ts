import { z } from 'zod';

export type LocateModel = {
  latitude: number;
  longitude: number;
};

export const locateParser = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type LocationModel = z.infer<typeof locateParser>;
