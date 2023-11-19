import { nearbyRecords } from '$/repository/testaRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await nearbyRecords(),
  }),
  // post: async ({ body }) => ({
  //   status: 201,
  //   body: await (body.content),
  // }),
}));
