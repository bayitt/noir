-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_category_uuid_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "Category"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
