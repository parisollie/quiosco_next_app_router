"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

//Vid 675 
//Vid 679,data: unknown
export async function createOrder(data: unknown) {
    //Vid 679
    const result = OrderSchema.safeParse(data)
    //Vid 679
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        //Vid 681
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}