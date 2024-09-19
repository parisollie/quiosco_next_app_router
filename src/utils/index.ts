export function formatCurrency(amount: number) {
    //Vid 660
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}
//Vid 712
export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}