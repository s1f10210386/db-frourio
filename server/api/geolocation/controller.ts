import { getFilterRecords } from '$/repository/testaRepository';
import { defineController } from './$relay';

export default defineController(({}) => ({
  get: async () => ({
    status: 200,
    body: await getFilterRecords(body.latitude, body.longitude),
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await getFilterRecords(body.latitude, body.longitude),
  }),
}));
