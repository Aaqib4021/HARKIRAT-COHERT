import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data:{
        email:"aaqib5@gmail.com",
        name:"Bashir"
    }
  })
}

main()
  .then(async () => {
    console.log("query executed successfully:");

    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
