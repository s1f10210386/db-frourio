import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      latitude: number;
      longitude: number;
    };
  };
}>;
