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
  // getwo: async () => ({
  //   status: 200,
  //   body: await getTwoDigitId(),
  // }),
}));

// export default defineController(() => ({
//   get: async ({ query }) => ({
//     status: 200,
//     body: await getTest(query.userId),
//   }),
//   post: async ({ body }) => ({
//     status: 201,
//     body: await postTest(body.userid, body.content),
//   }),
// }));
