/*
  Warnings:

  - You are about to alter the column `category_uuid` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `slug` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `featured_image` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `ArticleOnTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `article_uuid` on the `ArticleOnTag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tag_uuid` on the `ArticleOnTag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `slug` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `link` on the `Redirect` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `article_uuid` on the `Redirect` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_category_uuid_fkey";

-- DropForeignKey
ALTER TABLE "ArticleOnTag" DROP CONSTRAINT "ArticleOnTag_article_uuid_fkey";

-- DropForeignKey
ALTER TABLE "ArticleOnTag" DROP CONSTRAINT "ArticleOnTag_tag_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Redirect" DROP CONSTRAINT "Redirect_article_uuid_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "category_uuid" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "featured_image" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ArticleOnTag" DROP CONSTRAINT "ArticleOnTag_pkey",
ALTER COLUMN "article_uuid" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tag_uuid" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "ArticleOnTag_pkey" PRIMARY KEY ("article_uuid", "tag_uuid");

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Redirect" ALTER COLUMN "link" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "article_uuid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "Category"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleOnTag" ADD CONSTRAINT "ArticleOnTag_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "Article"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleOnTag" ADD CONSTRAINT "ArticleOnTag_tag_uuid_fkey" FOREIGN KEY ("tag_uuid") REFERENCES "Tag"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "Article"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
