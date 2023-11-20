import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { latitude: number; longitude: number };
    resBody: { id: number; content: string; latitude: number; longitude: number }[];
  };
}>;
