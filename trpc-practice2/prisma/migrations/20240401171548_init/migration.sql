/*
  Warnings:

  - Changed the type of `totalEpisodes` on the `Anime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "totalEpisodes",
ADD COLUMN     "totalEpisodes" INTEGER NOT NULL;
