-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('github', 'website');

-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "madeAt" TEXT NOT NULL,
    "builtWith" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "archiveID" TEXT NOT NULL,
    "type" "LinkType" NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD FOREIGN KEY ("archiveID") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
