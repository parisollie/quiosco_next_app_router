import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  //Vid 659
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

//Vid 650
//Vid 658 params: { category : string }}
export default async function OrderPage({params}: { params: { category : string }}) {
  const products = await getProducts(params.category)
  
  return ( //Vid 684
    <>
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>
    
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
          {products.map(product => (//Vid 660
            <ProductCard 
            //Nuestro key unico 
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </>
  )
}

