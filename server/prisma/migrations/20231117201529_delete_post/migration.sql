/*
  Warnings:

  - The primary key for the `Testa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Testa` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Testa" DROP CONSTRAINT "Testa_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Testa_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Post";
