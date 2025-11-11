-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "preferences" TEXT,
    "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "membershipTier" TEXT NOT NULL DEFAULT 'Bronze',
    "totalSpent" REAL NOT NULL DEFAULT 0,
    "referralCode" TEXT,
    "referredBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Customer" ("createdAt", "email", "id", "loyaltyPoints", "name", "phone", "preferences", "referralCode", "referredBy") SELECT "createdAt", "email", "id", "loyaltyPoints", "name", "phone", "preferences", "referralCode", "referredBy" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
CREATE UNIQUE INDEX "Customer_referralCode_key" ON "Customer"("referralCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
