import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      userID: number;
    };
    resBody: {
      id: string;
      likes: number;
      userID: number;
    };
  };
}>;
