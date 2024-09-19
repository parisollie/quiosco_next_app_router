import { z } from 'zod'

//Vid 677
export const OrderSchema = z.object({
    name: z.string()
            .min(1, 'Tu Nombre es Obligatorio'),
    //Vid 680
    total: z.number()
            .min(1, 'Hay errores en la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

//Vid 690
export const OrderIdSchema = z.object({
    orderId: z.string()
                .transform((value) => parseInt(value))
                .refine( value => value > 0, {message: 'Hay errores'} )
})

//Vid 700, la busqueda de productos.
export const SearchSchema = z.object({
    search: z.string()
                .trim()
                .min(1, {message: 'La búsqueda no puede ir vacia'})
})

 //Vid 707
export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    //Vid 711
    image: z.string().min(1, {message: 'La Imagen es obligatoria'})
})