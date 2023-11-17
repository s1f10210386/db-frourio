import { prismaClient } from '$/service/prismaClient';

// export const postTest = async (userId: string, content: string) => {
//   console.log('userid', userId);
//   console.log('content', content);
//   const result = await prismaClient.testa.create({
//     data: {
//       id: userId,
//       content,
//     },
//   });
//   return result;
// };

export const postTest = async (content: string) => {
  console.log(content);
  const result = await prismaClient.testa.create({
    data: {
      content,
    },
  });
  return result;
};

// export const getTest = async (user: string) => {
//   console.log(user);
//   const result = await prismaClient.testa.findMany({
//     where: {
//       id: user,
//     },
//   });
//   return result;
// };

export const getTest = async () => {
  const result = await prismaClient.testa.findMany({});
  return result;
};

//prismaで2桁のidだけを取得する操作をしている
export const getTwoDigitId = async () => {
  const twoDigitTesta = await prismaClient.testa.findMany({
    where: {
      id: {
        gte: 10, // 10以上
        lte: 99, // 99以下
      },
    },
  });
  return twoDigitTesta;
};
