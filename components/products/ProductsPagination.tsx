import Link from "next/link";
//Vid 695
type ProductsPaginationProps = {
    //Vid 695
    page: number
    totalPages: number
}

export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
    //Vid 698
    const pages = Array.from({length: totalPages}, (_, i) => i+ 1 )


    return (
        <nav className='flex justify-center py-10'>

            {page > 1 && (//Vid 697
                <Link
                    href={`/admin/products?page=${page - 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&laquo;</Link>
            )}

            {pages.map(currentPage => (//Vid 698
                <Link
                    //Vid 701
                    key={currentPage}
                    //Vid 697
                    href={`/admin/products?page=${currentPage}`}
                    //Vid 698
                    className={`${page === currentPage ? 'font-black bg-amber-400' : 'bg-white' } px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    //className={`${page === currentPage && 'font-black'}  bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >{currentPage}</Link>
            ))}

            {page < totalPages && (//Vid 696
                <Link
                    href={`/admin/products?page=${page + 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&raquo;</Link>
            )}

        </nav>
    )
}
