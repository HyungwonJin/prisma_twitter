-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fav" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "twitId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fav_twitId_fkey" FOREIGN KEY ("twitId") REFERENCES "Twit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fav" ("createdAt", "id", "twitId", "updatedAt", "userId") SELECT "createdAt", "id", "twitId", "updatedAt", "userId" FROM "Fav";
DROP TABLE "Fav";
ALTER TABLE "new_Fav" RENAME TO "Fav";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
