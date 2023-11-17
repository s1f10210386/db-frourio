import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: { id: string; content: string }[];
  };
  post: {
    reqBody: {
      content: string;
    };
  };
}>;
