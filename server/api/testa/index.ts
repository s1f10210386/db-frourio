import type { DefineMethods } from 'aspida';

// export type Methods = DefineMethods<{
//   get: {
//     query: { userId: string };
//     resBody: { id: string; content: string }[];
//   };
//   post: {
//     reqBody: {
//       userid: string;
//       content: string;
//     };
//   };
// }>;

export type Methods = DefineMethods<{
  get: {
    resBody: { id: number; content: string }[];
  };
  post: {
    reqBody: {
      content: string;
    };
  };
  // getwo: {
  //   resBody: { id: number; content: string }[];
  // };
}>;
