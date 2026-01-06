import { prisma } from "@/lib/prisma";
import data from './seminar.seed.json';

async function main() {
  
  await prisma.$executeRawUnsafe(
  `TRUNCATE TABLE Seminar`
)

  await prisma.seminar.createMany({
    data
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
