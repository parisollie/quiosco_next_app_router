import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

//Vid 655
async function getCategories() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  //Vid 655
  const categories = await getCategories()
  
  return (//Vid 683
    <aside className="md:w-72 md:h-screen bg-white">
        <Logo />
        <nav className='mt-10'>
            {categories.map(category => (//Vid 656
              <CategoryIcon 
                key={category.id}
                category={category}
              />
            ))}
        </nav>
    </aside>
  )
}
