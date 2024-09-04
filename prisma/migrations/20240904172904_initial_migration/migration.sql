-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OP" (
    "id" SERIAL NOT NULL,
    "quoteNum" INTEGER NOT NULL,
    "board" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resposta" (
    "id" SERIAL NOT NULL,
    "quoteNum" INTEGER NOT NULL,
    "board" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "opId" INTEGER NOT NULL,
    "adminRes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "resposta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "resposta_opId_fkey" FOREIGN KEY ("opId") REFERENCES "OP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
