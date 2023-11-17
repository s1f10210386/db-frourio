import { getTest, postTest } from '$/repository/testaRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await getTest(),
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await postTest(body.content),
  }),
}));
