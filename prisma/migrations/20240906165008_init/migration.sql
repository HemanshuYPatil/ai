-- DropIndex
DROP INDEX "Project_clerkID_key";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "clerkID" DROP NOT NULL;
