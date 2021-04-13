/*
  Warnings:

  - You are about to drop the column `archiveID` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `Archive` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectID` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_archiveID_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "archiveID",
ADD COLUMN     "projectID" TEXT NOT NULL;

-- DropTable
DROP TABLE "Archive";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "madeAt" TEXT,
    "builtWith" TEXT[],
    "isArchive" BOOLEAN NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "achievements" TEXT[],
    "isOnGoing" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageProject" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "projectID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPrimary" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageProject" ADD FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
