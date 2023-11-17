import { z } from 'zod';

export type TestModel = {
  id: number;
  content: string;
};

export const testaParser = z.object({
  id: z.number(),
  content: z.string(),
});

export type TestaModel = z.infer<typeof testaParser>;
