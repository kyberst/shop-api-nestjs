-- Products Table Migration
CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "rating" REAL DEFAULT 5,
    "moq" INTEGER DEFAULT 1,
    "supplierName" TEXT,
    "supplierCountry" TEXT,
    "isTradeAssurance" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
