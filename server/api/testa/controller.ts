import { postTest } from '$/repository/testaRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await postTest(body.content),
  }),
}));
