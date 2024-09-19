"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

//Vid 703
//Vid 706,{children}: {children : React.ReactNode}
export default function AddProductForm({children}: {children : React.ReactNode}) {
    //Vid 711
    const router = useRouter()

    //Vid 705,validaciones.
    const handleSubmit = async (formData: FormData) => {
        //Vid 707
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            //Vid 711
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        //Vid 711
        const response = await createProduct(result.data)
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        toast.success('Producto Creado correctamente')
        router.push('/admin/products')
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                //Vid 705
                action={handleSubmit}
            >
                
                {children}
                <input
                //Vid 706
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Registrar Producto'
                />
            </form>
        </div>
    )
}
