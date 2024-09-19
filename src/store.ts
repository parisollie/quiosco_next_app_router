import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

//Vid 663
interface Store {
    order: OrderItem[]
    //Vid 665
    addToOrder: (product: Product) => void
    //Vid 669
    increaseQuantity: (id: Product['id']) => void
    //670
    decreaseQuantity: (id: Product['id']) => void
    //Vid 671
    removeItem: (id: Product['id']) => void
    //Vid 682
    clearOrder: () => void
}

//Vid 666,le pasamos la funcion de set 
export const useStore = create<Store>((set, get) => ({
    order: [],
    //Vid 665
    addToOrder: (product) => {
        //Vid 666,sacamos los atributos que queremos sacar.
        const {categoryId, image, ...data} = product
        //Vid 668
        let order : OrderItem[] = []

        //Vid 668 
        if(get().order.find( item => item.id === product.id)) {
            //Ver que no haya duplicados 
            order = get().order.map( item => item.id === product.id ? {
                //Tomamos na copia de item
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        } else {
            order = [...get().order, {
                //Vid 666
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set(() => ({
            order
        }))
    },
    //Vid 669
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    //670
    decreaseQuantity: (id) => {
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item )

        set(() => ({
            order
        }))
    },
    //Vid 671
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    //Vid 682
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))