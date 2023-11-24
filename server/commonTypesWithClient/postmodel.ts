import { z } from 'zod';

export type PostModel = {
  id: string;
  likes: number;
  userId: number;
};

export const postParser = z.object({
  id: z.string(),
  likes: z.number(),
  userID: z.number(),
});

export type PostsModel = z.infer<typeof postParser>;
