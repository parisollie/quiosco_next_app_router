import { prisma } from "@/src/lib/prisma"

//Vid 722 
export const dynamic = 'force-dynamic'
//Vid 718
export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}
