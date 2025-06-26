
DROP TABLE IF EXISTS "cases";
CREATE TABLE "cases" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "comments" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
