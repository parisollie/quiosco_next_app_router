"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

//Vid 665
type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
    //Vid 665
    const addToOrder = useStore((state) => state.addToOrder)  

    return (
        <button
        //Vid 660
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={() => addToOrder(product)}
        >Agregar</button>
    )
}
