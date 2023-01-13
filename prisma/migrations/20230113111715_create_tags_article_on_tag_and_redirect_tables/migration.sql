-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_category_uuid_fkey";

-- CreateTable
CREATE TABLE "Tag" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ArticleOnTag" (
    "article_uuid" TEXT NOT NULL,
    "tag_uuid" TEXT NOT NULL,

    CONSTRAINT "ArticleOnTag_pkey" PRIMARY KEY ("article_uuid","tag_uuid")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "uuid" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "article_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_article_uuid_key" ON "Redirect"("article_uuid");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "Category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleOnTag" ADD CONSTRAINT "ArticleOnTag_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "Article"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleOnTag" ADD CONSTRAINT "ArticleOnTag_tag_uuid_fkey" FOREIGN KEY ("tag_uuid") REFERENCES "Tag"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "Article"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
