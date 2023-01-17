-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "category_uuid" DROP NOT NULL,
ALTER COLUMN "featured_image" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
