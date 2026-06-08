/*
  Warnings:

  - You are about to drop the `_BookmarkToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookmarkToTags" DROP CONSTRAINT "_BookmarkToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkToTags" DROP CONSTRAINT "_BookmarkToTags_B_fkey";

-- DropTable
DROP TABLE "_BookmarkToTags";

-- CreateTable
CREATE TABLE "_BookmarkTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookmarkTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookmarkTags_B_index" ON "_BookmarkTags"("B");

-- AddForeignKey
ALTER TABLE "_BookmarkTags" ADD CONSTRAINT "_BookmarkTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkTags" ADD CONSTRAINT "_BookmarkTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
