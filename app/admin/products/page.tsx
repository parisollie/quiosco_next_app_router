import { redirect } from 'next/navigation'
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';

//Vid 695, cuantos productos hay ?
async function productCount() {
  return await prisma.product.count()
}

//Vid 692 
async function getProducts(page: number, pageSize: number) {
  //Vid 694
  const skip = (page - 1) * pageSize
  //Vid 692 
  const products = await prisma.product.findMany({
    //Vid 694
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}
//Vid 693
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

//Vid 694
export default async function ProductsPage({searchParams} : { searchParams: {page: string}}) {

  //Lo convertimos a numero con + 
  const page = +searchParams.page || 1
  const pageSize = 10
  //Vid 697
  if(page < 0) redirect('/admin/products')
  //Vid 695
  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [ products, totalProducts] = await Promise.all([productsData, totalProductsData])
  //Vid 696
  const totalPages = Math.ceil(totalProducts / pageSize)
  //Vid 697
  if(page > totalPages) redirect('/admin/products')


  return ( //Vid 685
      <>
          <Heading>Administrar Productos</Heading>

          <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
              <Link
                  //Vid 699
                  href={'/admin/products/new'}
                  className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
              >Crear Producto</Link>

              <ProductSearchForm />
          </div>

          <ProductTable
          //Vid 692 
            products={products}
          />

          <ProductsPagination 
            page={page}
            //Vid 696
            totalPages={totalPages}
          />
      </>
  )
}
