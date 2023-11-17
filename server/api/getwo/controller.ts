import { getTwoDigitId } from '$/repository/testaRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await getTwoDigitId(),
  }),
  // post: async ({ body }) => ({
  //   status: 201,
  //   body: await (body.content),
  // }),
}));
