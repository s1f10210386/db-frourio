import { defineController } from './$relay';

export default defineController(() => ({
  post: () => ({ status: 201, body: { message: 'リクエストが成功しました' } }),
}));
