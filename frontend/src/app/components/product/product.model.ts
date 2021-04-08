export interface Product {
    id?: number, //nullable
    name: string,
    price: number,
    amount: number,
    description: string,
    category?: string,
    categoryId: number
}
