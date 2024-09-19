"use server"
import { revalidatePath} from 'next/cache'
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

//Vid 689
export async function completeOrder(formData: FormData) {
    //Vid 690
    const data = {
        orderId : formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)

    if(result.success) {
        //Vid 690
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    //Vid 690
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })

            //Vid 691
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error)
        }
    }
    

}