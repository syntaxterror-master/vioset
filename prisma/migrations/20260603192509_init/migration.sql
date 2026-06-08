/*
  Warnings:

  - Added the required column `authorId` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "previews" SET DEFAULT 0,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tags" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
