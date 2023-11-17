import { prismaClient } from '$/service/prismaClient';
import { randomUUID } from 'crypto';

export const postTest = async (content: string) => {
  console.log(content);
  const result = await prismaClient.testa.create({
    data: {
      id: randomUUID(),
      content,
    },
  });
  return result;
};
