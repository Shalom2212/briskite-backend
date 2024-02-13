/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Menu";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Food" (
    "food_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "restaurant_id" INTEGER NOT NULL,
    "food_name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "sst" INTEGER NOT NULL,
    "set" INTEGER NOT NULL,
    CONSTRAINT "Food_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurants" ("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_Users" ("email", "name", "password", "phone", "role", "user_id") SELECT "email", "name", "password", "phone", "role", "user_id" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
