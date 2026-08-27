import { prisma } from "./prisma/prisma.js";

const usuarios = await prisma.user.findMany();

console.log(usuarios);

await prisma.$disconnect();