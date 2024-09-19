import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from '@prisma/client'

//Vid 654
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then( async () => {
        await prisma.$disconnect()
    })
    .catch( async (e) => {
        console.error(e)
        await prisma.$disconnect()
        //Siempre que haya errores le pasamos 
        process.exit(1)
    })