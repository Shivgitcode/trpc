-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "animeName" TEXT NOT NULL,
    "totalEpisodes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
