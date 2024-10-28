-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "clerkID" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "description" TEXT,
    "time" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_clerkID_key" ON "Project"("clerkID");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
