/*
  Warnings:

  - You are about to drop the column `quantity` on the `UsageRecord` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `UsageRecord` table. All the data in the column will be lost.
  - Added the required column `agentId` to the `UsageRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'facebook/blenderbot-400M-distill',
ADD COLUMN     "systemPrompt" TEXT NOT NULL DEFAULT 'You are a helpful customer service AI assistant. Please be polite and professional.';

-- AlterTable
ALTER TABLE "UsageRecord" DROP COLUMN "quantity",
DROP COLUMN "type",
ADD COLUMN     "agentId" TEXT NOT NULL,
ADD COLUMN     "calls" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tokensUsed" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "cost" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "UsageRecord_agentId_idx" ON "UsageRecord"("agentId");

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
