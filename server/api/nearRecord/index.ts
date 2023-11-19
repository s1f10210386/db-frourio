import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: { id: number; content: string; latitude: number; longitude: number }[];
  };
}>;
