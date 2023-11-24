import { postPost } from '$/repository/testaRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => {
    console.log('clientから届いたbody', body);
    const data = await postPost(body.userID);
    return { status: 201, body: data };
  },
}));
