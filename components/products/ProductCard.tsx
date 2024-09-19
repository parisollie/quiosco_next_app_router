import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

//Vid 660
type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {

  //Vid 712
  const imagePath = getImagePath(product.image)

  return (
    <div className="border bg-white">

        <Image
        //Vid 661
            width={400}
            height={500}
            src={imagePath}
            alt={`Imagen platillo ${product.name}`}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
              { formatCurrency( product.price )}
            </p>
            <AddProductButton 
            //Vid 665
              product={product}
            />
        </div>
    </div>
  )
}
