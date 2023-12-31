//prismaでDBをどう操作するかを管理する関数(DBをいじくる)

import { prismaClient } from '$/service/prismaClient';
import { randomUUID } from 'crypto';

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

export const postTest = async (content: string, latitude: number, longitude: number) => {
  const result = await prismaClient.testa.create({
    data: {
      content,
      latitude,
      longitude,
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

//prismaで2桁のidだけを取得する操作をしている(getだから引数いらない)
// const currentLatitude = 35.7695488;
// const currentLongitude = 139.722752;

//
export const nearbyRecords = async (currentLatitude: number, currentLongitude: number) => {
  const latitudeRange = 0.009; // 約1kmの緯度範囲
  const longitudeRange = 0.0118; // 約1kmの経度範囲
  console.log('currentLatitude', currentLatitude);
  const records = await prismaClient.testa.findMany({
    where: {
      latitude: {
        // gte: currentLatitude - latitudeRange,
        lte: currentLatitude + latitudeRange,
      },
      longitude: {
        // gte: currentLongitude - longitudeRange,
        lte: currentLongitude + longitudeRange,
      },
    },
  });
  console.log('records', records);
  return records;
};

export const postPost = async (userid: number) => {
  console.log('back届いた');
  const post = prismaClient.post.create({
    data: {
      id: randomUUID(),
      likes: 2,
      userID: userid,
    },
  });
  console.log('post', post);
  return post;
};
