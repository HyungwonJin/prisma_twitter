-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fav" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "twitId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Fav_twitId_fkey" FOREIGN KEY ("twitId") REFERENCES "Twit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Fav" ("createdAt", "id", "twitId", "updatedAt", "userId") SELECT "createdAt", "id", "twitId", "updatedAt", "userId" FROM "Fav";
DROP TABLE "Fav";
ALTER TABLE "new_Fav" RENAME TO "Fav";
CREATE TABLE "new_Twit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Twit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Twit" ("createdAt", "description", "id", "title", "updatedAt", "userId") SELECT "createdAt", "description", "id", "title", "updatedAt", "userId" FROM "Twit";
DROP TABLE "Twit";
ALTER TABLE "new_Twit" RENAME TO "Twit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
