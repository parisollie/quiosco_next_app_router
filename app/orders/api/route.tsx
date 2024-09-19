import { prisma } from "@/src/lib/prisma";

//Vid 722
export const dynamic = 'force-dynamic'

//Vid 720
export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'
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