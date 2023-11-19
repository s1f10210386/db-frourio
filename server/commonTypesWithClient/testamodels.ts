import { z } from 'zod';

export type TestModel = {
  id: number;
  content: string;
  latitude: number;
  longitude: number;
};

export const testaParser = z.object({
  id: z.number(),
  content: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type TestaModel = z.infer<typeof testaParser>;
